import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const suppliers = [
  {
    name: 'AVA LSP',
    displayName: 'Supplier A',
    contactMethod: 'Telegram',
    shippingCostBase: 65,
    avgShippingDays: 7,
    shippingFrom: 'China',
    notes: 'Primary supplier for weight loss peptides. Best pricing on Sema, Tirz, Reta.',
    isActive: true,
  },
  {
    name: 'SPB',
    displayName: 'Supplier B',
    contactMethod: 'Telegram',
    shippingCostBase: 50,
    avgShippingDays: 5,
    shippingFrom: 'Domestic',
    notes: 'Best for recovery peptides (BPC157, TB500). Lower shipping cost.',
    isActive: true,
  },
  {
    name: 'QST',
    displayName: 'Supplier C',
    contactMethod: 'Telegram',
    shippingCostBase: 50,
    avgShippingDays: 6,
    shippingFrom: 'Domestic',
    notes: 'Backup supplier for recovery peptides. Same pricing as SPB.',
    isActive: true,
  },
];

const products = [
  { name: 'Semaglutide 5mg', slug: 'semaglutide-5mg', dosage: '5mg per vial', category: 'Weight Loss', baseCost: 35, shippingCost: 65, markupAmount: 43, salePrice: 143, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Semaglutide 10mg', slug: 'semaglutide-10mg', dosage: '10mg per vial', category: 'Weight Loss', baseCost: 45, shippingCost: 65, markupAmount: 52, salePrice: 162, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Semaglutide 15mg', slug: 'semaglutide-15mg', dosage: '15mg per vial', category: 'Weight Loss', baseCost: 60, shippingCost: 65, markupAmount: 67, salePrice: 192, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Semaglutide 20mg', slug: 'semaglutide-20mg', dosage: '20mg per vial', category: 'Weight Loss', baseCost: 70, shippingCost: 65, markupAmount: 83, salePrice: 218, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Semaglutide 30mg', slug: 'semaglutide-30mg', dosage: '30mg per vial', category: 'Weight Loss', baseCost: 90, shippingCost: 65, markupAmount: 103, salePrice: 258, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Tirzepatide 5mg', slug: 'tirzepatide-5mg', dosage: '5mg per vial', category: 'Weight Loss', baseCost: 40, shippingCost: 65, markupAmount: 45, salePrice: 150, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Tirzepatide 10mg', slug: 'tirzepatide-10mg', dosage: '10mg per vial', category: 'Weight Loss', baseCost: 50, shippingCost: 65, markupAmount: 54, salePrice: 169, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Tirzepatide 15mg', slug: 'tirzepatide-15mg', dosage: '15mg per vial', category: 'Weight Loss', baseCost: 60, shippingCost: 65, markupAmount: 67, salePrice: 192, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Tirzepatide 20mg', slug: 'tirzepatide-20mg', dosage: '20mg per vial', category: 'Weight Loss', baseCost: 70, shippingCost: 65, markupAmount: 83, salePrice: 218, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Tirzepatide 30mg', slug: 'tirzepatide-30mg', dosage: '30mg per vial', category: 'Weight Loss', baseCost: 90, shippingCost: 65, markupAmount: 112, salePrice: 267, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Tirzepatide 40mg', slug: 'tirzepatide-40mg', dosage: '40mg per vial', category: 'Weight Loss', baseCost: 115, shippingCost: 65, markupAmount: 147, salePrice: 327, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Tirzepatide 50mg', slug: 'tirzepatide-50mg', dosage: '50mg per vial', category: 'Weight Loss', baseCost: 145, shippingCost: 65, markupAmount: 186, salePrice: 396, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Tirzepatide 60mg', slug: 'tirzepatide-60mg', dosage: '60mg per vial', category: 'Weight Loss', baseCost: 170, shippingCost: 65, markupAmount: 217, salePrice: 452, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Retatrutide 5mg', slug: 'retatrutide-5mg', dosage: '5mg per vial', category: 'Weight Loss', baseCost: 55, shippingCost: 65, markupAmount: 65, salePrice: 185, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Retatrutide 10mg', slug: 'retatrutide-10mg', dosage: '10mg per vial', category: 'Weight Loss', baseCost: 80, shippingCost: 65, markupAmount: 97, salePrice: 242, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Retatrutide 15mg', slug: 'retatrutide-15mg', dosage: '15mg per vial', category: 'Weight Loss', baseCost: 100, shippingCost: 65, markupAmount: 119, salePrice: 284, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Retatrutide 20mg', slug: 'retatrutide-20mg', dosage: '20mg per vial', category: 'Weight Loss', baseCost: 130, shippingCost: 65, markupAmount: 160, salePrice: 355, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Retatrutide 30mg', slug: 'retatrutide-30mg', dosage: '30mg per vial', category: 'Weight Loss', baseCost: 160, shippingCost: 65, markupAmount: 200, salePrice: 425, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Retatrutide 40mg', slug: 'retatrutide-40mg', dosage: '40mg per vial', category: 'Weight Loss', baseCost: 200, shippingCost: 65, markupAmount: 245, salePrice: 510, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Retatrutide 50mg', slug: 'retatrutide-50mg', dosage: '50mg per vial', category: 'Weight Loss', baseCost: 245, shippingCost: 65, markupAmount: 298, salePrice: 608, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Retatrutide 60mg', slug: 'retatrutide-60mg', dosage: '60mg per vial', category: 'Weight Loss', baseCost: 290, shippingCost: 65, markupAmount: 355, salePrice: 710, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'BPC157 5mg', slug: 'bpc157-5mg', dosage: '5mg per vial', category: 'Recovery', baseCost: 40, shippingCost: 50, markupAmount: 35, salePrice: 125, supplierName: 'SPB', stockQuantity: 50 },
  { name: 'BPC157 10mg', slug: 'bpc157-10mg', dosage: '10mg per vial', category: 'Recovery', baseCost: 65, shippingCost: 50, markupAmount: 49, salePrice: 164, supplierName: 'SPB', stockQuantity: 50 },
  { name: 'TB500 5mg', slug: 'tb500-5mg', dosage: '5mg per vial', category: 'Recovery', baseCost: 75, shippingCost: 50, markupAmount: 59, salePrice: 184, supplierName: 'SPB', stockQuantity: 50 },
  { name: 'TB500 10mg', slug: 'tb500-10mg', dosage: '10mg per vial', category: 'Recovery', baseCost: 110, shippingCost: 50, markupAmount: 86, salePrice: 246, supplierName: 'SPB', stockQuantity: 50 },
  { name: 'BPC157 10mg Alt', slug: 'bpc157-10mg-alt', dosage: '10mg per vial', category: 'Recovery', baseCost: 65, shippingCost: 50, markupAmount: 49, salePrice: 164, supplierName: 'QST', stockQuantity: 50 },
  { name: 'TB500 10mg Alt', slug: 'tb500-10mg-alt', dosage: '10mg per vial', category: 'Recovery', baseCost: 110, shippingCost: 50, markupAmount: 86, salePrice: 246, supplierName: 'QST', stockQuantity: 50 },
  { name: 'NAD+ 100mg', slug: 'nad-100mg', dosage: '100mg per vial', category: 'Wellness', baseCost: 40, shippingCost: 65, markupAmount: 45, salePrice: 150, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'NAD+ 500mg', slug: 'nad-500mg', dosage: '500mg per vial', category: 'Wellness', baseCost: 75, shippingCost: 65, markupAmount: 75, salePrice: 215, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'NAD+ 1000mg', slug: 'nad-1000mg', dosage: '1000mg per vial', category: 'Wellness', baseCost: 120, shippingCost: 65, markupAmount: 113, salePrice: 298, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Ipamorelin 5mg', slug: 'ipamorelin-5mg', dosage: '5mg per vial', category: 'Growth Hormone', baseCost: 45, shippingCost: 65, markupAmount: 45, salePrice: 155, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Ipamorelin 10mg', slug: 'ipamorelin-10mg', dosage: '10mg per vial', category: 'Growth Hormone', baseCost: 80, shippingCost: 65, markupAmount: 70, salePrice: 215, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Tesamorelin 5mg', slug: 'tesamorelin-5mg', dosage: '5mg per vial', category: 'Growth Hormone', baseCost: 110, shippingCost: 65, markupAmount: 90, salePrice: 265, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Tesamorelin 10mg', slug: 'tesamorelin-10mg', dosage: '10mg per vial', category: 'Growth Hormone', baseCost: 175, shippingCost: 65, markupAmount: 130, salePrice: 370, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'CJC-1295 No DAC 5mg', slug: 'cjc-1295-no-dac-5mg', dosage: '5mg per vial', category: 'Growth Hormone', baseCost: 80, shippingCost: 65, markupAmount: 70, salePrice: 215, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'CJC-1295 No DAC 10mg', slug: 'cjc-1295-no-dac-10mg', dosage: '10mg per vial', category: 'Growth Hormone', baseCost: 130, shippingCost: 65, markupAmount: 105, salePrice: 300, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'HGH 10iu', slug: 'hgh-10iu', dosage: '10iu per vial', category: 'Growth Hormone', baseCost: 50, shippingCost: 65, markupAmount: 50, salePrice: 165, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'HGH 15iu', slug: 'hgh-15iu', dosage: '15iu per vial', category: 'Growth Hormone', baseCost: 80, shippingCost: 65, markupAmount: 70, salePrice: 215, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'GHRP-2 5mg', slug: 'ghrp-2-5mg', dosage: '5mg per vial', category: 'Growth Hormone', baseCost: 30, shippingCost: 65, markupAmount: 40, salePrice: 135, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'GHRP-2 10mg', slug: 'ghrp-2-10mg', dosage: '10mg per vial', category: 'Growth Hormone', baseCost: 55, shippingCost: 65, markupAmount: 55, salePrice: 175, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'GHRP-6 5mg', slug: 'ghrp-6-5mg', dosage: '5mg per vial', category: 'Growth Hormone', baseCost: 30, shippingCost: 65, markupAmount: 40, salePrice: 135, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'GHRP-6 10mg', slug: 'ghrp-6-10mg', dosage: '10mg per vial', category: 'Growth Hormone', baseCost: 50, shippingCost: 65, markupAmount: 50, salePrice: 165, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'GLOW Blend', slug: 'glow-blend', dosage: '70mg total per kit', category: 'Blends', baseCost: 160, shippingCost: 65, markupAmount: 130, salePrice: 355, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'KLOW Blend', slug: 'klow-blend', dosage: '80mg total per kit', category: 'Blends', baseCost: 185, shippingCost: 65, markupAmount: 145, salePrice: 395, supplierName: 'AVA LSP', stockQuantity: 50 },
  { name: 'Ipamorelin 10mg SPB', slug: 'ipamorelin-10mg-spb', dosage: '10mg per vial', category: 'Growth Hormone', baseCost: 70, shippingCost: 50, markupAmount: 65, salePrice: 185, supplierName: 'SPB', stockQuantity: 50 },
  { name: 'Tesamorelin 10mg SPB', slug: 'tesamorelin-10mg-spb', dosage: '10mg per vial', category: 'Growth Hormone', baseCost: 160, shippingCost: 50, markupAmount: 125, salePrice: 335, supplierName: 'SPB', stockQuantity: 50 }
];

async function main() {
  console.log('Starting seed...\n');

  // Create/update suppliers via upsert (name is unique)
  const createdSuppliers = [];
  for (const supplier of suppliers) {
    const created = await prisma.supplier.upsert({
      where: { name: supplier.name },
      update: supplier,
      create: supplier,
    });
    createdSuppliers.push(created);
  }
  console.log(`Done with ${createdSuppliers.length} suppliers\n`);

  // Create/update products (assign supplierId by matching supplierName)
  let createdCount = 0;
  for (const product of products) {
    const supplier = createdSuppliers.find((s) => s.name === product.supplierName);
    if (!supplier) {
      console.warn(`Skipping product ${product.slug} — supplier not found: ${product.supplierName}`);
      continue;
    }

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        dosage: product.dosage,
        category: product.category,
        baseCost: product.baseCost,
        shippingCost: product.shippingCost,
        markupAmount: product.markupAmount,
        salePrice: product.salePrice,
        supplierId: supplier.id,
        inStock: true,
        stockQuantity: product.stockQuantity,
        isActive: true
      },
      create: {
        name: product.name,
        slug: product.slug,
        dosage: product.dosage,
        category: product.category,
        baseCost: product.baseCost,
        shippingCost: product.shippingCost,
        markupAmount: product.markupAmount,
        salePrice: product.salePrice,
        supplierId: supplier.id,
        inStock: true,
        stockQuantity: product.stockQuantity,
        isActive: true
      }
    });
    createdCount++;
  }
  console.log(`Done with ${createdCount} products\n`);

  const productCount = await prisma.product.count();
  const supplierCount = await prisma.supplier.count();

  console.log('Database Summary:');
  console.log(`  Suppliers: ${supplierCount}`);
  console.log(`  Products: ${productCount}\n`);

  console.log('Seed complete!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
