import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, items, paymentMethod, subtotal, shipping, total } = body;

    // Validation
    if (!customer || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Calculate costs for profit tracking
    let totalCost = 0;
    const orderItems = [];

    for (const item of items) {
      // Get product cost from database
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

    // Create order in database
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

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to customer

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}