const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function removeSupplies() {
  try {
    const result = await prisma.product.deleteMany({
      where: {
        category: 'Supplies'
      }
    });
    
    console.log(`Removed ${result.count} supply items from products`);
  } catch (error) {
    console.error('Error removing supplies:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeSupplies();