import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface OrderUpdate {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  total: number;
  paymentStatus: string;
}

async function sendStatusUpdateNotification(order: OrderUpdate, paymentStatus: string, orderStatus: string) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return;
  }

  let message = '';
  
  if (paymentStatus === 'paid' && order.paymentStatus === 'pending') {
    message = `
✅ *PAYMENT CONFIRMED*

📦 Order: \`${order.orderNumber}\`
💰 Amount: $${order.total.toFixed(2)}
👤 Customer: ${order.customerName}

Status updated to: PAID
Next step: Forward order to supplier
`;
  } else if (orderStatus === 'shipped') {
    message = `
📮 *ORDER SHIPPED*

📦 Order: \`${order.orderNumber}\`
👤 Customer: ${order.customerName}
📧 Email: ${order.customerEmail}

Remember to:
- Send tracking number to customer
- Update them via email
`;
  }

  if (message) {
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
}

export async function PATCH(request: NextRequest) {
  try {
    const { orderId, paymentStatus, orderStatus } = await request.json();

    const currentOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!currentOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const updateData: {
      paymentStatus?: string;
      paidAt?: Date;
      orderStatus?: string;
      shippedAt?: Date;
    } = {};
    
    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
      if (paymentStatus === 'paid') {
        updateData.paidAt = new Date();
      }
    }
    
    if (orderStatus) {
      updateData.orderStatus = orderStatus;
      if (orderStatus === 'shipped') {
        updateData.shippedAt = new Date();
      }
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });

    await sendStatusUpdateNotification({
      orderNumber: currentOrder.orderNumber,
      customerName: currentOrder.customerName || '',
      customerEmail: currentOrder.customerEmail,
      total: Number(currentOrder.total),
      paymentStatus: currentOrder.paymentStatus,
    }, paymentStatus, orderStatus);

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}