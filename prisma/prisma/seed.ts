import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample suppliers
  const supplier1 = await prisma.supplier.create({
    data: {
      name: 'Grey Market Supplier A',
      telegramHandle: '@supplierA',
      contactMethod: 'Telegram',
      shippingFrom: 'International',
      avgShippingDays: 14,
      shippingCostBase: 10.00,
      rating: 4.5,
      paymentMethod: 'Crypto',
      isActive: true,
    },
  });

  const supplier2 = await prisma.supplier.create({
    data: {
      name: 'Grey Market Supplier B',
      telegramHandle: '@supplierB',
      contactMethod: 'Telegram',
      shippingFrom: 'Domestic',
      avgShippingDays: 7,
      shippingCostBase: 15.00,
      rating: 4.8,
      paymentMethod: 'Crypto/Zelle',
      isActive: true,
    },
  });

  console.log('✅ Created suppliers');

  // Create sample products
  const products = [
    {
      name: 'Semaglutide 5mg',
      slug: 'semaglutide-5mg',
      description: 'GLP-1 receptor agonist for metabolic research. Research use only.',
      dosage: '5mg',
      category: 'GLP-1 Agonists',
      baseCost: 85.00,
      shippingCost: 10.00,
      markupAmount: 35.00,
      salePrice: 130.00,
      inStock: true,
      stockQuantity: 50,
      supplierId: supplier1.id,
      imageUrl: null,
      metaTitle: 'Semaglutide 5mg - Research Peptide',
      metaDescription: 'High-quality Semaglutide 5mg for research purposes',
      isActive: true,
    },
    {
      name: 'Tirzepatide 10mg',
      slug: 'tirzepatide-10mg',
      description: 'Dual GIP/GLP-1 receptor agonist for advanced metabolic studies. Research use only.',
      dosage: '10mg',
      category: 'GLP-1 Agonists',
      baseCost: 140.00,
      shippingCost: 10.00,
      markupAmount: 40.00,
      salePrice: 190.00,
      inStock: true,
      stockQuantity: 35,
      supplierId: supplier1.id,
      imageUrl: null,
      metaTitle: 'Tirzepatide 10mg - Research Peptide',
      metaDescription: 'Premium Tirzepatide 10mg for research applications',
      isActive: true,
    },
    {
      name: 'BPC-157 5mg',
      slug: 'bpc-157-5mg',
      description: 'Body protection compound peptide for tissue research. Research use only.',
      dosage: '5mg',
      category: 'Healing Peptides',
      baseCost: 30.00,
      shippingCost: 10.00,
      markupAmount: 10.00,
      salePrice: 50.00,
      inStock: true,
      stockQuantity: 100,
      supplierId: supplier2.id,
      imageUrl: null,
      metaTitle: 'BPC-157 5mg - Research Peptide',
      metaDescription: 'High-purity BPC-157 for laboratory research',
      isActive: true,
    },
    {
      name: 'TB-500 5mg',
      slug: 'tb-500-5mg',
      description: 'Thymosin Beta-4 fragment for cellular research. Research use only.',
      dosage: '5mg',
      category: 'Healing Peptides',
      baseCost: 55.00,
      shippingCost: 10.00,
      markupAmount: 15.00,
      salePrice: 80.00,
      inStock: true,
      stockQuantity: 75,
      supplierId: supplier2.id,
      imageUrl: null,
      metaTitle: 'TB-500 5mg - Research Peptide',
      metaDescription: 'Quality TB-500 peptide for research purposes',
      isActive: true,
    },
    {
      name: 'Retatrutide 10mg',
      slug: 'retatrutide-10mg',
      description: 'Triple receptor agonist for advanced metabolic research. Research use only.',
      dosage: '10mg',
      category: 'GLP-1 Agonists',
      baseCost: 180.00,
      shippingCost: 15.00,
      markupAmount: 55.00,
      salePrice: 250.00,
      inStock: false,
      stockQuantity: 0,
      supplierId: supplier1.id,
      imageUrl: null,
      metaTitle: 'Retatrutide 10mg - Research Peptide',
      metaDescription: 'Premium Retatrutide for cutting-edge research',
      isActive: true,
    },
    {
      name: 'CJC-1295 2mg',
      slug: 'cjc-1295-2mg',
      description: 'Growth hormone releasing hormone analog for research. Research use only.',
      dosage: '2mg',
      category: 'Growth Hormones',
      baseCost: 40.00,
      shippingCost: 10.00,
      markupAmount: 10.00,
      salePrice: 60.00,
      inStock: true,
      stockQuantity: 60,
      supplierId: supplier2.id,
      imageUrl: null,
      metaTitle: 'CJC-1295 2mg - Research Peptide',
      metaDescription: 'High-quality CJC-1295 for laboratory use',
      isActive: true,
    },
    {
      name: 'Ipamorelin 5mg',
      slug: 'ipamorelin-5mg',
      description: 'Growth hormone secretagogue for research applications. Research use only.',
      dosage: '5mg',
      category: 'Growth Hormones',
      baseCost: 35.00,
      shippingCost: 10.00,
      markupAmount: 10.00,
      salePrice: 55.00,
      inStock: true,
      stockQuantity: 80,
      supplierId: supplier2.id,
      imageUrl: null,
      metaTitle: 'Ipamorelin 5mg - Research Peptide',
      metaDescription: 'Pure Ipamorelin peptide for research',
      isActive: true,
    },
    {
      name: 'Melanotan II 10mg',
      slug: 'melanotan-ii-10mg',
      description: 'Melanocortin receptor agonist for research purposes. Research use only.',
      dosage: '10mg',
      category: 'Research Peptides',
      baseCost: 25.00,
      shippingCost: 10.00,
      markupAmount: 10.00,
      salePrice: 45.00,
      inStock: true,
      stockQuantity: 90,
      supplierId: supplier2.id,
      imageUrl: null,
      metaTitle: 'Melanotan II 10mg - Research Peptide',
      metaDescription: 'Research-grade Melanotan II peptide',
      isActive: true,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('✅ Created 8 sample products');

  // Log some supplier prices for history
  await prisma.supplierPrice.create({
    data: {
      supplierId: supplier1.id,
      productName: 'Semaglutide 5mg',
      price: 85.00,
      shippingCost: 10.00,
      sourceType: 'telegram',
      notes: 'Initial price from supplier',
    },
  });

  console.log('✅ Created price history');
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });