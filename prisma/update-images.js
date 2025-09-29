const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const CLOUDINARY_CLOUD_NAME = 'ds42miizn';

// Map compound names to their Cloudinary image filenames
const imageMap = {
  'semaglutide': 'Sema_ve7any',
  'tirzepatide': 'tirz_urtfuv', 
  'retatrutide': 'reta_rrethg',
};

async function updateProductImages() {
  console.log('📸 Updating product images...');

  for (const [compound, filename] of Object.entries(imageMap)) {
    // Cloudinary URL format
    const imageUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${filename}`;

    // Update all products that contain this compound name
    const result = await prisma.product.updateMany({
      where: {
        name: {
          contains: compound,
          mode: 'insensitive', // Case-insensitive search
        },
      },
      data: {
        imageUrl: imageUrl,
      },
    });

    console.log(`✅ Updated ${result.count} ${compound} products with image: ${imageUrl}`);
  }

  console.log('🎉 All product images updated!');
}

updateProductImages()
  .catch((e) => {
    console.error('❌ Error updating images:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });