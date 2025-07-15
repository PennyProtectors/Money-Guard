const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './src/assets/images';
const outputDir = './src/assets/images/optimized';

// Çıktı klasörünü oluştur
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  try {
    const files = fs.readdirSync(inputDir);
    
    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const fileExt = path.extname(file).toLowerCase();
      const fileName = path.basename(file, fileExt);
      
      // Sadece resim dosyalarını işle
      if (['.png', '.jpg', '.jpeg'].includes(fileExt)) {
        console.log(`Processing: ${file}`);
        
        // 1x versiyonu (optimize edilmiş)
        await sharp(inputPath)
          .resize(null, null, { 
            withoutEnlargement: true,
            fit: 'inside'
          })
          .png({ 
            quality: 90, 
            compressionLevel: 9,
            palette: true 
          })
          .toFile(path.join(outputDir, `${fileName}.png`));
        
        // 2x versiyonu (retina için)
        await sharp(inputPath)
          .resize(null, null, { 
            withoutEnlargement: false,
            fit: 'inside'
          })
          .png({ 
            quality: 90, 
            compressionLevel: 9,
            palette: true 
          })
          .toFile(path.join(outputDir, `${fileName}@2x.png`));
        
        // WebP versiyonları
        await sharp(inputPath)
          .webp({ quality: 85 })
          .toFile(path.join(outputDir, `${fileName}.webp`));
        
        await sharp(inputPath)
          .webp({ quality: 85 })
          .toFile(path.join(outputDir, `${fileName}@2x.webp`));
        
        console.log(`✓ Generated: ${fileName}.png, ${fileName}@2x.png, ${fileName}.webp, ${fileName}@2x.webp`);
      }
    }
    
    console.log('🎉 Image optimization completed!');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages();