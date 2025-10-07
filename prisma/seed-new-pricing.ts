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

// NEW PRICING MODEL: salePrice = baseCost + markup (NO shipping in price)
// Shipping charged separately at checkout
const products = [
  // Weight Loss - Supplier A
  { name: 'Semaglutide 5mg', slug: 'semaglutide-5mg', dosage: '5mg per vial', category: 'Weight Loss', baseCost: 35, markup: 43, supplierName: 'AVA LSP' },
  { name: 'Semaglutide 10mg', slug: 'semaglutide-10mg', dosage: '10mg per vial', category: 'Weight Loss', baseCost: 45, markup: 52, supplierName: 'AVA LSP' },
  { name: 'Semaglutide 15mg', slug: 'semaglutide-15mg', dosage: '15mg per vial', category: 'Weight Loss', baseCost: 60, markup: 67, supplierName: 'AVA LSP' },
  { name: 'Semaglutide 20mg', slug: 'semaglutide-20mg', dosage: '20mg per vial', category: 'Weight Loss', baseCost: 70, markup: 83, supplierName: 'AVA LSP' },
  { name: 'Semaglutide 30mg', slug: 'semaglutide-30mg', dosage: '30mg per vial', category: 'Weight Loss', baseCost: 90, markup: 103, supplierName: 'AVA LSP' },
  { name: 'Tirzepatide 5mg', slug: 'tirzepatide-5mg', dosage: '5mg per vial', category: 'Weight Loss', baseCost: 40, markup: 45, supplierName: 'AVA LSP' },
  { name: 'Tirzepatide 10mg', slug: 'tirzepatide-10mg', dosage: '10mg per vial', category: 'Weight Loss', baseCost: 50, markup: 54, supplierName: 'AVA LSP' },
  { name: 'Tirzepatide 15mg', slug: 'tirzepatide-15mg', dosage: '15mg per vial', category: 'Weight Loss', baseCost: 60, markup: 67, supplierName: 'AVA LSP' },
  { name: 'Tirzepatide 20mg', slug: 'tirzepatide-20mg', dosage: '20mg per vial', category: 'Weight Loss', baseCost: 70, markup: 83, supplierName: 'AVA LSP' },
  { name: 'Tirzepatide 30mg', slug: 'tirzepatide-30mg', dosage: '30mg per vial', category: 'Weight Loss', baseCost: 90, markup: 112, supplierName: 'AVA LSP' },
  { name: 'Tirzepatide 40mg', slug: 'tirzepatide-40mg', dosage: '40mg per vial', category: 'Weight Loss', baseCost: 115, markup: 147, supplierName: 'AVA LSP' },
  { name: 'Tirzepatide 50mg', slug: 'tirzepatide-50mg', dosage: '50mg per vial', category: 'Weight Loss', baseCost: 145, markup: 186, supplierName: 'AVA LSP' },
  { name: 'Tirzepatide 60mg', slug: 'tirzepatide-60mg', dosage: '60mg per vial', category: 'Weight Loss', baseCost: 170, markup: 217, supplierName: 'AVA LSP' },
  { name: 'Retatrutide 5mg', slug: 'retatrutide-5mg', dosage: '5mg per vial', category: 'Weight Loss', baseCost: 55, markup: 65, supplierName: 'AVA LSP' },
  { name: 'Retatrutide 10mg', slug: 'retatrutide-10mg', dosage: '10mg per vial', category: 'Weight Loss', baseCost: 80, markup: 97, supplierName: 'AVA LSP' },
  { name: 'Retatrutide 15mg', slug: 'retatrutide-15mg', dosage: '15mg per vial', category: 'Weight Loss', baseCost: 100, markup: 119, supplierName: 'AVA LSP' },
  { name: 'Retatrutide 20mg', slug: 'retatrutide-20mg', dosage: '20mg per vial', category: 'Weight Loss', baseCost: 130, markup: 160, supplierName: 'AVA LSP' },
  { name: 'Retatrutide 30mg', slug: 'retatrutide-30mg', dosage: '30mg per vial', category: 'Weight Loss', baseCost: 160, markup: 200, supplierName: 'AVA LSP' },
  { name: 'Retatrutide 40mg', slug: 'retatrutide-40mg', dosage: '40mg per vial', category: 'Weight Loss', baseCost: 200, markup: 245, supplierName: 'AVA LSP' },
  { name: 'Retatrutide 50mg', slug: 'retatrutide-50mg', dosage: '50mg per vial', category: 'Weight Loss', baseCost: 245, markup: 298, supplierName: 'AVA LSP' },
  { name: 'Retatrutide 60mg', slug: 'retatrutide-60mg', dosage: '60mg per vial', category: 'Weight Loss', baseCost: 290, markup: 355, supplierName: 'AVA LSP' },
  
  // Recovery - Supplier B
  { name: 'BPC157 5mg', slug: 'bpc157-5mg', dosage: '5mg per vial', category: 'Recovery', baseCost: 40, markup: 35, supplierName: 'SPB' },
  { name: 'BPC157 10mg', slug: 'bpc157-10mg', dosage: '10mg per vial', category: 'Recovery', baseCost: 65, markup: 49, supplierName: 'SPB' },
  { name: 'TB500 5mg', slug: 'tb500-5mg', dosage: '5mg per vial', category: 'Recovery', baseCost: 75, markup: 59, supplierName: 'SPB' },
  { name: 'TB500 10mg', slug: 'tb500-10mg', dosage: '10mg per vial', category: 'Recovery', baseCost: 110, markup: 86, supplierName: 'SPB' },
  
  // Recovery - Supplier C
  { name: 'BPC157 10mg Alt', slug: 'bpc157-10mg-alt', dosage: '10mg per vial', category: 'Recovery', baseCost: 65, markup: 49, supplierName: 'QST' },
  { name: 'TB500 10mg Alt', slug: 'tb500-10mg-alt', dosage: '10mg per vial', category: 'Recovery', baseCost: 110, markup: 86, supplierName: 'QST' },
  
  // Wellness - Supplier A
  { name: 'NAD+ 100mg', slug: 'nad-100mg', dosage: '100mg per vial', category: 'Wellness', baseCost: 40, markup: 45, supplierName: 'AVA LSP' },
  { name: 'NAD+ 500mg', slug: 'nad-500mg', dosage: '500mg per vial', category: 'Wellness', baseCost: 75, markup: 75, supplierName: 'AVA LSP' },
  { name: 'NAD+ 1000mg', slug: 'nad-1000mg', dosage: '1000mg per vial', category: 'Wellness', baseCost: 120, markup: 113, supplierName: 'AVA LSP' },
  
  // Growth Hormone - Supplier A
  { name: 'Ipamorelin 5mg', slug: 'ipamorelin-5mg', dosage: '5mg per vial', category: 'Growth Hormone', baseCost: 45, markup: 45, supplierName: 'AVA LSP' },
  { name: 'Ipamorelin 10mg', slug: 'ipamorelin-10mg', dosage: '10mg per vial', category: 'Growth Hormone', baseCost: 80, markup: 70, supplierName: 'AVA LSP' },
  { name: 'Tesamorelin 5mg', slug: 'tesamorelin-5mg', dosage: '5mg per vial', category: 'Growth Hormone', baseCost: 110, markup: 90, supplierName: 'AVA LSP' },
  { name: 'Tesamorelin 10mg', slug: 'tesamorelin-10mg', dosage: '10mg per vial', category: 'Growth Hormone', baseCost: 175, markup: 130, supplierName: 'AVA LSP' },
  { name: 'CJC-1295 No DAC 5mg', slug: 'cjc-1295-no-dac-5mg', dosage: '5mg per vial', category: 'Growth Hormone', baseCost: 80, markup: 70, supplierName: 'AVA LSP' },
  { name: 'CJC-1295 No DAC 10mg', slug: 'cjc-1295-no-dac-10mg', dosage: '10mg per vial', category: 'Growth Hormone', baseCost: 130, markup: 105, supplierName: 'AVA LSP' },
  { name: 'HGH 10iu', slug: 'hgh-10iu', dosage: '10iu per vial', category: 'Growth Hormone', baseCost: 50, markup: 50, supplierName: 'AVA LSP' },
  { name: 'HGH 15iu', slug: 'hgh-15iu', dosage: '15iu per vial', category: 'Growth Hormone', baseCost: 80, markup: 70, supplierName: 'AVA LSP' },
  { name: 'GHRP-2 5mg', slug: 'ghrp-2-5mg', dosage: '5mg per vial', category: 'Growth Hormone', baseCost: 30, markup: 40, supplierName: 'AVA LSP' },
  { name: 'GHRP-2 10mg', slug: 'ghrp-2-10mg', dosage: '10mg per vial', category: 'Growth Hormone', baseCost: 55, markup: 55, supplierName: 'AVA LSP' },
  { name: 'GHRP-6 5mg', slug: 'ghrp-6-5mg', dosage: '5mg per vial', category: 'Growth Hormone', baseCost: 30, markup: 40, supplierName: 'AVA LSP' },
  { name: 'GHRP-6 10mg', slug: 'ghrp-6-10mg', dosage: '10mg per vial', category: 'Growth Hormone', baseCost: 50, markup: 50, supplierName: 'AVA LSP' },
  
  // Blends - Supplier A
  { name: 'GLOW Blend', slug: 'glow-blend', dosage: '70mg total per kit', category: 'Blends', baseCost: 160, markup: 130, supplierName: 'AVA LSP' },
  { name: 'KLOW Blend', slug: 'klow-blend', dosage: '80mg total per kit', category: 'Blends', baseCost: 185, markup: 145, supplierName: 'AVA LSP' },
  
  // Growth Hormone - Supplier B
  { name: 'Ipamorelin 10mg SPB', slug: 'ipamorelin-10mg-spb', dosage: '10mg per vial', category: 'Growth Hormone', baseCost: 70, markup: 65, supplierName: 'SPB' },
  { name: 'Tesamorelin 10mg SPB', slug: 'tesamorelin-10mg-spb', dosage: '10mg per vial', category: 'Growth Hormone', baseCost: 160, markup: 125, supplierName: 'SPB' },
];

async function main() {
  console.log('🔄 Starting NEW pricing model migration...\n');

  // Create/update suppliers
  const createdSuppliers = [];
  for (const supplier of suppliers) {
    const created = await prisma.supplier.upsert({
      where: { name: supplier.name },
      update: supplier,
      create: supplier,
    });
    createdSuppliers.push(created);
  }
  console.log(`✅ ${createdSuppliers.length} suppliers ready\n`);

  // Update products with NEW pricing (no shipping in salePrice)
  let updatedCount = 0;
  for (const product of products) {
    const supplier = createdSuppliers.find((s) => s.name === product.supplierName);
    if (!supplier) {
      console.warn(`⚠️ Skipping ${product.slug} - supplier not found`);
      continue;
    }

    const supplierShipping = Number(supplier.shippingCostBase || 0);
    const newSalePrice = product.baseCost + product.markup; // NO shipping!
    
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        dosage: product.dosage,
        category: product.category,
        baseCost: product.baseCost,
        shippingCost: supplierShipping, // Keep for cost tracking only
        markupAmount: product.markup,
        salePrice: newSalePrice, // NEW: No shipping included!
        supplierId: supplier.id,
        inStock: true,
        stockQuantity: 50,
        isActive: true
      },
      create: {
        name: product.name,
        slug: product.slug,
        dosage: product.dosage,
        category: product.category,
        baseCost: product.baseCost,
        shippingCost: supplierShipping,
        markupAmount: product.markup,
        salePrice: newSalePrice,
        supplierId: supplier.id,
        inStock: true,
        stockQuantity: 50,
        isActive: true
      }
    });
    updatedCount++;
  }

  console.log(`✅ Updated ${updatedCount} products with new pricing\n`);
  console.log('📊 Database Summary:');
  console.log(`  Suppliers: ${await prisma.supplier.count()}`);
  console.log(`  Products: ${await prisma.product.count()}\n`);
  console.log('🎉 NEW PRICING MODEL APPLIED!');
  console.log('💡 Shipping now charged separately at checkout based on supplier');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });