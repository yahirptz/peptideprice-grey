const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with real ZLZ products...');

  // Create supplier
  const supplier = await prisma.supplier.create({
    data: {
      name: 'ZLZ Peptides',
      telegramHandle: '@zlz_supplier',
      contactMethod: 'Telegram',
      shippingFrom: 'International',
      avgShippingDays: 14,
      shippingCostBase: 65.00,
      rating: 4.8,
      paymentMethod: 'Crypto/Zelle/CashApp',
      isActive: true,
    },
  });

  console.log('✅ Created ZLZ supplier');

  // Product data with real prices
  // Formula: salePrice = (supplierCost + shipping) * 1.5 (50% markup)
  const products = [
    // GLP-1 AGONISTS
    { name: 'Semaglutide 5mg', slug: 'semaglutide-5mg', category: 'GLP-1 Agonists', dosage: '5mg per vial', baseCost: 40, description: 'GLP-1 receptor agonist for metabolic research. Kit of 10 vials. Research use only.' },
    { name: 'Semaglutide 10mg', slug: 'semaglutide-10mg', category: 'GLP-1 Agonists', dosage: '10mg per vial', baseCost: 63, description: 'GLP-1 receptor agonist for metabolic research. Kit of 10 vials. Research use only.' },
    { name: 'Semaglutide 15mg', slug: 'semaglutide-15mg', category: 'GLP-1 Agonists', dosage: '15mg per vial', baseCost: 74, description: 'GLP-1 receptor agonist for metabolic research. Kit of 10 vials. Research use only.' },
    { name: 'Semaglutide 20mg', slug: 'semaglutide-20mg', category: 'GLP-1 Agonists', dosage: '20mg per vial', baseCost: 89, description: 'GLP-1 receptor agonist for metabolic research. Kit of 10 vials. Research use only.' },
    { name: 'Semaglutide 30mg', slug: 'semaglutide-30mg', category: 'GLP-1 Agonists', dosage: '30mg per vial', baseCost: 109, description: 'GLP-1 receptor agonist for metabolic research. Kit of 10 vials. Research use only.' },
    
    { name: 'Tirzepatide 5mg', slug: 'tirzepatide-5mg', category: 'GLP-1 Agonists', dosage: '5mg per vial', baseCost: 43, description: 'Dual GIP/GLP-1 receptor agonist for advanced metabolic studies. Kit of 10 vials. Research use only.' },
    { name: 'Tirzepatide 10mg', slug: 'tirzepatide-10mg', category: 'GLP-1 Agonists', dosage: '10mg per vial', baseCost: 63, description: 'Dual GIP/GLP-1 receptor agonist for advanced metabolic studies. Kit of 10 vials. Research use only.' },
    { name: 'Tirzepatide 15mg', slug: 'tirzepatide-15mg', category: 'GLP-1 Agonists', dosage: '15mg per vial', baseCost: 80, description: 'Dual GIP/GLP-1 receptor agonist for advanced metabolic studies. Kit of 10 vials. Research use only.' },
    { name: 'Tirzepatide 20mg', slug: 'tirzepatide-20mg', category: 'GLP-1 Agonists', dosage: '20mg per vial', baseCost: 94, description: 'Dual GIP/GLP-1 receptor agonist for advanced metabolic studies. Kit of 10 vials. Research use only.' },
    { name: 'Tirzepatide 30mg', slug: 'tirzepatide-30mg', category: 'GLP-1 Agonists', dosage: '30mg per vial', baseCost: 114, description: 'Dual GIP/GLP-1 receptor agonist for advanced metabolic studies. Kit of 10 vials. Research use only.' },
    
    { name: 'Retatrutide 5mg', slug: 'retatrutide-5mg', category: 'GLP-1 Agonists', dosage: '5mg per vial', baseCost: 73, description: 'Triple receptor agonist for advanced metabolic research. Kit of 10 vials. Research use only.' },
    { name: 'Retatrutide 10mg', slug: 'retatrutide-10mg', category: 'GLP-1 Agonists', dosage: '10mg per vial', baseCost: 109, description: 'Triple receptor agonist for advanced metabolic research. Kit of 10 vials. Research use only.' },
    { name: 'Retatrutide 15mg', slug: 'retatrutide-15mg', category: 'GLP-1 Agonists', dosage: '15mg per vial', baseCost: 122, description: 'Triple receptor agonist for advanced metabolic research. Kit of 10 vials. Research use only.' },
    { name: 'Retatrutide 20mg', slug: 'retatrutide-20mg', category: 'GLP-1 Agonists', dosage: '20mg per vial', baseCost: 136, description: 'Triple receptor agonist for advanced metabolic research. Kit of 10 vials. Research use only.' },
    
    // HEALING PEPTIDES
    { name: 'BPC-157 5mg', slug: 'bpc-157-5mg', category: 'Healing Peptides', dosage: '5mg per vial', baseCost: 41, description: 'Body protection compound peptide for tissue research. Kit of 10 vials. Research use only.' },
    { name: 'BPC-157 10mg', slug: 'bpc-157-10mg', category: 'Healing Peptides', dosage: '10mg per vial', baseCost: 68, description: 'Body protection compound peptide for tissue research. Kit of 10 vials. Research use only.' },
    
    { name: 'TB-500 2mg', slug: 'tb-500-2mg', category: 'Healing Peptides', dosage: '2mg per vial', baseCost: 49, description: 'Thymosin Beta-4 fragment for cellular research. Kit of 10 vials. Research use only.' },
    { name: 'TB-500 5mg', slug: 'tb-500-5mg', category: 'Healing Peptides', dosage: '5mg per vial', baseCost: 95, description: 'Thymosin Beta-4 fragment for cellular research. Kit of 10 vials. Research use only.' },
    { name: 'TB-500 10mg', slug: 'tb-500-10mg', category: 'Healing Peptides', dosage: '10mg per vial', baseCost: 176, description: 'Thymosin Beta-4 fragment for cellular research. Kit of 10 vials. Research use only.' },
    
    { name: 'BPC + TB-500 Blend 10mg', slug: 'bpc-tb-blend-10mg', category: 'Healing Peptides', dosage: '10mg per vial', baseCost: 122, description: 'Combined BPC-157 and TB-500 for comprehensive tissue research. Kit of 10 vials. Research use only.' },
    
    // GROWTH HORMONES
    { name: 'CJC-1295 No DAC 2mg', slug: 'cjc-1295-no-dac-2mg', category: 'Growth Hormones', dosage: '2mg per vial', baseCost: 41, description: 'Growth hormone releasing hormone analog for research. Kit of 10 vials. Research use only.' },
    { name: 'CJC-1295 No DAC 5mg', slug: 'cjc-1295-no-dac-5mg', category: 'Growth Hormones', dosage: '5mg per vial', baseCost: 95, description: 'Growth hormone releasing hormone analog for research. Kit of 10 vials. Research use only.' },
    { name: 'CJC-1295 No DAC 10mg', slug: 'cjc-1295-no-dac-10mg', category: 'Growth Hormones', dosage: '10mg per vial', baseCost: 185, description: 'Growth hormone releasing hormone analog for research. Kit of 10 vials. Research use only.' },
    
    { name: 'Ipamorelin 2mg', slug: 'ipamorelin-2mg', category: 'Growth Hormones', dosage: '2mg per vial', baseCost: 22, description: 'Growth hormone secretagogue for research applications. Kit of 10 vials. Research use only.' },
    { name: 'Ipamorelin 5mg', slug: 'ipamorelin-5mg', category: 'Growth Hormones', dosage: '5mg per vial', baseCost: 41, description: 'Growth hormone secretagogue for research applications. Kit of 10 vials. Research use only.' },
    { name: 'Ipamorelin 10mg', slug: 'ipamorelin-10mg', category: 'Growth Hormones', dosage: '10mg per vial', baseCost: 81, description: 'Growth hormone secretagogue for research applications. Kit of 10 vials. Research use only.' },
    
    // ANTI-AGING
    { name: 'Epithalon 10mg', slug: 'epithalon-10mg', category: 'Anti-Aging', dosage: '10mg per vial', baseCost: 38, description: 'Telomerase activator for longevity research. Kit of 10 vials. Research use only.' },
    { name: 'Epithalon 50mg', slug: 'epithalon-50mg', category: 'Anti-Aging', dosage: '50mg per vial', baseCost: 176, description: 'Telomerase activator for longevity research. Kit of 10 vials. Research use only.' },
    
    { name: 'NAD+ 100mg', slug: 'nad-100mg', category: 'Anti-Aging', dosage: '100mg per vial', baseCost: 54, description: 'Cellular energy and anti-aging research compound. Kit of 10 vials. Research use only.' },
    { name: 'NAD+ 500mg', slug: 'nad-500mg', category: 'Anti-Aging', dosage: '500mg per vial', baseCost: 95, description: 'Cellular energy and anti-aging research compound. Kit of 10 vials. Research use only.' },
    { name: 'NAD+ 1000mg', slug: 'nad-1000mg', category: 'Anti-Aging', dosage: '1000mg per vial', baseCost: 176, description: 'Cellular energy and anti-aging research compound. Kit of 10 vials. Research use only.' },
    
    { name: 'GHK-Cu 50mg', slug: 'ghk-cu-50mg', category: 'Anti-Aging', dosage: '50mg per vial', baseCost: 33, description: 'Copper peptide for skin and tissue research. Kit of 10 vials. Research use only.' },
    { name: 'GHK-Cu 100mg', slug: 'ghk-cu-100mg', category: 'Anti-Aging', dosage: '100mg per vial', baseCost: 65, description: 'Copper peptide for skin and tissue research. Kit of 10 vials. Research use only.' },
    
    // RESEARCH PEPTIDES
    { name: 'Melanotan II 10mg', slug: 'melanotan-ii-10mg', category: 'Research Peptides', dosage: '10mg per vial', baseCost: 54, description: 'Melanocortin receptor agonist for research purposes. Kit of 10 vials. Research use only.' },
    { name: 'PT-141 10mg', slug: 'pt-141-10mg', category: 'Research Peptides', dosage: '10mg per vial', baseCost: 62, description: 'Melanocortin receptor agonist for research. Kit of 10 vials. Research use only.' },
    { name: 'AOD-9604 5mg', slug: 'aod-9604-5mg', category: 'Research Peptides', dosage: '5mg per vial', baseCost: 109, description: 'Growth hormone fragment for metabolic research. Kit of 10 vials. Research use only.' },
    { name: 'MOTS-c 10mg', slug: 'mots-c-10mg', category: 'Research Peptides', dosage: '10mg per vial', baseCost: 71, description: 'Mitochondrial peptide for metabolic research. Kit of 10 vials. Research use only.' },
    { name: 'Thymosin Alpha-1 5mg', slug: 'thymosin-alpha-1-5mg', category: 'Research Peptides', dosage: '5mg per vial', baseCost: 109, description: 'Immune system research peptide. Kit of 10 vials. Research use only.' },
    { name: 'Glutathione 600mg', slug: 'glutathione-600mg', category: 'Research Peptides', dosage: '600mg per vial', baseCost: 40, description: 'Antioxidant research compound. Kit of 10 vials. Research use only.' },
    { name: 'Selank 5mg', slug: 'selank-5mg', category: 'Research Peptides', dosage: '5mg per vial', baseCost: 49, description: 'Anxiolytic research peptide. Kit of 10 vials. Research use only.' },
    { name: 'Semax 5mg', slug: 'semax-5mg', category: 'Research Peptides', dosage: '5mg per vial', baseCost: 49, description: 'Nootropic research peptide. Kit of 10 vials. Research use only.' },
  ];

  const shippingCost = 65.00;

  for (const product of products) {
    const totalCost = product.baseCost + shippingCost;
    const salePrice = Math.round(totalCost * 1.5); // 50% markup
    const markupAmount = salePrice - totalCost;

    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        dosage: product.dosage,
        category: product.category,
        baseCost: product.baseCost,
        shippingCost: shippingCost,
        markupAmount: markupAmount,
        salePrice: salePrice,
        inStock: true,
        stockQuantity: 50,
        supplierId: supplier.id,
        imageUrl: null,
        metaTitle: `${product.name} - Research Peptide Kit`,
        metaDescription: `High-quality ${product.name} research peptide kit of 10 vials`,
        isActive: true,
      },
    });
  }

  console.log(`✅ Created ${products.length} products with real ZLZ pricing`);
  console.log('💰 Pricing formula: (Supplier Cost + $65 shipping) × 1.5 = Your Price');
  console.log('🎉 Database seeded successfully with real products!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });