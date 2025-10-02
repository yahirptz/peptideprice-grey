import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      include: {
        supplier: {
          select: {
            displayName: true,
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
      }))
    );
  } catch (error) {
    console.error('Error loading products:', error);
    return NextResponse.json([], { status: 500 });
  }
}