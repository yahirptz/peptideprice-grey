const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const { parse } = require('csv-parse/sync');
const prisma = new PrismaClient();

async function importProducts() {
  const csvContent = fs.readFileSync('Supabase Snippet List All Products.csv', 'utf-8');
  
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  console.log(`Found ${records.length} products in CSV`);

  let imported = 0;
  let skipped = 0;

  for (const record of records) {
    try {
      await prisma.product.create({
        data: {
          name: record.name,
          slug: record.slug,
          description: record.description || null,
          dosage: record.dosage || null,
          category: record.category || null,
          baseCost: parseFloat(record.baseCost) || 0,
          shippingCost: parseFloat(record.shippingCost) || 0,
          markupAmount: parseFloat(record.markupAmount) || 0,
          salePrice: parseFloat(record.salePrice) || 0,
          inStock: record.inStock === 'true' || record.inStock === '1' || record.inStock === true,
          stockQuantity: parseInt(record.stockQuantity) || 0,
          isActive: record.isActive === 'true' || record.isActive === '1' || record.isActive === true,
        },
      });
      imported++;
      console.log(`✓ ${imported}. ${record.name}`);
    } catch (error) {
      console.log(`✗ Skipped: ${record.name} - ${error.message}`);
      skipped++;
    }
  }

  console.log(`\nComplete: ${imported} imported, ${skipped} skipped`);
}

importProducts()
  .catch(console.error)
  .finally(() => prisma.$disconnect());