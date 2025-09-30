const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Semaglutide 5mg',
      slug: 'semaglutide-5mg',
      baseCost: 85,
      shippingCost: 10,
      markupAmount: 35,
      salePrice: 130,
      inStock: true,
      stockQuantity: 10,
      isActive: true,
    },
  });
  console.log('Product created:', product);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());