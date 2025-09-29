import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

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
        metaTitle: true,
        metaDescription: true,
        // DON'T include supplier info or costs!
        // baseCost: false,
        // shippingCost: false,
        // markupAmount: false,
        // supplierId: false,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}