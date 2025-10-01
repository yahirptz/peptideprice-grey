import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';

const prisma = new PrismaClient();

function generateSecureOrderNumber(): string {
  const randomHex = randomBytes(8).toString('hex').toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  return `ORD-${timestamp}-${randomHex}`;
}

async function sendTelegramNotification(order: {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  total: number;
  profit: number;
  totalCost: number;
  paymentMethod: string;
  items: Array<{ productName: string; quantity: number }>;
}) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return;
  }

  const message = `
🆕 *NEW ORDER RECEIVED*

📦 Order: \`${order.orderNumber}\`
💰 Total: $${order.total.toFixed(2)}
💵 Cost: $${order.totalCost.toFixed(2)}
✨ Profit: $${order.profit.toFixed(2)}
💳 Payment: ${order.paymentMethod?.toUpperCase() || 'N/A'}

👤 *Customer*
Name: ${order.customerName}
Email: ${order.customerEmail}

📋 *Items*
${order.items.map(item => `• ${item.productName} (x${item.quantity})`).join('\n')}

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

    const orderNumber = generateSecureOrderNumber();

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
        shippingCountry: customer.shippingCountry || 'US',
        subtotal: subtotal,
        shippingCharged: shipping,
        tax: 0,
        total: total,
        totalCost: totalCost,
        profit: profit,
        paymentMethod: paymentMethod || 'crypto',
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

    await sendTelegramNotification({
      orderNumber: order.orderNumber,
      customerName: order.customerName || '',
      customerEmail: order.customerEmail,
      total: Number(order.total),
      profit: Number(order.profit),
      totalCost: Number(order.totalCost),
      paymentMethod: order.paymentMethod || '',
      items: orderItems.map(item => ({
        productName: item.productName,
        quantity: item.quantity,
      })),
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}