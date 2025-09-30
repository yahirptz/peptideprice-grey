const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addSupplies() {
  const supplies = [
    {
      name: 'Bacteriostatic Water 30ml',
      slug: 'bacteriostatic-water-30ml',
      description: 'Sterile water for reconstitution of peptides. Contains 0.9% benzyl alcohol as preservative.',
      dosage: '30ml',
      category: 'Supplies',
      baseCost: 8,
      shippingCost: 3,
      markupAmount: 4,
      salePrice: 15,
      inStock: true,
      stockQuantity: 50,
      isActive: true,
    },
    {
      name: 'Insulin Syringes 1ml 31G (10 pack)',
      slug: 'insulin-syringes-31g-10pack',
      description: '1ml insulin syringes with 31 gauge needle. Pack of 10 sterile syringes.',
      dosage: '10 pack',
      category: 'Supplies',
      baseCost: 5,
      shippingCost: 2,
      markupAmount: 3,
      salePrice: 10,
      inStock: true,
      stockQuantity: 100,
      isActive: true,
    },
    {
      name: 'Alcohol Prep Pads (100 pack)',
      slug: 'alcohol-prep-pads-100pack',
      description: 'Sterile 70% isopropyl alcohol prep pads. Pack of 100.',
      dosage: '100 pack',
      category: 'Supplies',
      baseCost: 3,
      shippingCost: 2,
      markupAmount: 2,
      salePrice: 7,
      inStock: true,
      stockQuantity: 75,
      isActive: true,
    },
    {
      name: '10ml Empty Sterile Vials (5 pack)',
      slug: 'empty-vials-10ml-5pack',
      description: 'Empty sterile glass vials with rubber stoppers. 10ml capacity, pack of 5.',
      dosage: '5 pack',
      category: 'Supplies',
      baseCost: 6,
      shippingCost: 2,
      markupAmount: 4,
      salePrice: 12,
      inStock: true,
      stockQuantity: 40,
      isActive: true,
    },
  ];

  for (const supply of supplies) {
    try {
      await prisma.product.create({ data: supply });
      console.log(`✓ Added: ${supply.name}`);
    } catch (error) {
      console.log(`✗ Skipped: ${supply.name} - ${error.message}`);
    }
  }

  console.log('\nSupplies added successfully!');
}

addSupplies()
  .catch(console.error)
  .finally(() => prisma.$disconnect());