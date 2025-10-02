import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// In Next.js 15, params is now a Promise
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params
    const { id } = await params;
    
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { id: parseInt(id) },
          { slug: id }
        ],
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
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...product,
      salePrice: Number(product.salePrice),
    });
  } catch (error) {
    console.error('Error loading product:', error);
    return NextResponse.json(
      { error: 'Failed to load product' },
      { status: 500 }
    );
  }
}