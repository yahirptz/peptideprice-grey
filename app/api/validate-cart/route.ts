import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { productIds } = await request.json();

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ valid: true });
    }

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const supplierIds = [...new Set(products.map((p) => p.supplierId))];

    if (supplierIds.length > 1) {
      const supplierNames = [
        ...new Set(products.map((p) => p.supplier?.name)),
      ];
      return NextResponse.json({
        valid: false,
        message: `Your cart contains items from multiple suppliers (${supplierNames.join(
          ' and '
        )}). Please order from one supplier at a time to avoid double shipping costs.`,
      });
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('Cart validation error:', error);
    return NextResponse.json(
      { valid: false, message: 'Validation error' },
      { status: 500 }
    );
  }
}
