import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

async function sendTelegramNotification(order: any) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('Telegram not configured - skipping notification');
    return;
  }

  const message = `
🛍️ *NEW ORDER RECEIVED*

📦 Order: \`${order.orderNumber}\`
💰 Total: $${order.total.toFixed(2)}
💵 Profit: $${order.profit.toFixed(2)}

👤 *Customer*
Name: ${order.customerName}
Email: ${order.customerEmail}

📍 *Shipping*
${order.shippingAddress}
${order.shippingCity}, ${order.shippingState} ${order.shippingZip}

💳 *Payment*
Method: ${order.paymentMethod.toUpperCase()}
Status: PENDING - Awaiting confirmation

📋 *Items*
${order.orderItems.map((item: any) => 
  `• ${item.productName} x${item.quantity} - $${(item.unitPrice * item.quantity).toFixed(2)}`
).join('\n')}

⚠️ *Customer must include order number in payment note:*
\`${order.orderNumber}\`
`;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, items, paymentMethod, subtotal, shipping, total } = body;

    if (!customer || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const orderNumber = generateOrderNumber();

    let totalCost = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.id },
        select: {
          baseCost: true,
          shippingCost: true,
        },
      });

      if (!product) {
        continue;
      }

      const unitCost = Number(product.baseCost) + Number(product.shippingCost);
      totalCost += unitCost * item.quantity;

      orderItems.push({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.price,
        unitCost: unitCost,
        productName: item.name,
        productDosage: item.dosage || '',
      });
    }

    const profit = total - totalCost;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerEmail: customer.customerEmail,
        customerName: customer.customerName,
        shippingAddress: customer.shippingAddress,
        shippingCity: customer.shippingCity,
        shippingState: customer.shippingState || '',
        shippingZip: customer.shippingZip,
        shippingCountry: customer.shippingCountry,
        subtotal,
        shippingCharged: shipping,
        tax: 0,
        total,
        totalCost,
        profit,
        paymentMethod,
        paymentStatus: 'pending',
        orderStatus: 'received',
        orderItems: {
          create: orderItems,
        },
      },
      include: {
        orderItems: true,
      },
    });

    await sendTelegramNotification(order);

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}