import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        dosage: true,
        category: true,
        salePrice: true,
        inStock: true,
        stockQuantity: true,
        imageUrl: true,
        supplierId: true,
        supplier: {
          select: {
            displayName: true,
            shippingCostBase: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(
      products.map((product) => ({
        ...product,
        salePrice: Number(product.salePrice),
        supplierLabel: product.supplier?.displayName || 'Unknown',
        supplierShippingCost: Number(product.supplier?.shippingCostBase || 0),
      }))
    );
  } catch (error) {
    console.error('Error loading products:', error);
    return NextResponse.json([], { status: 500 });
  }
}