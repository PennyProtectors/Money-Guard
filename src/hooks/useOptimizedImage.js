import { useState, useEffect } from 'react';

export const useOptimizedImage = (imageName, extension = 'png') => {
  const [imageSources, setImageSources] = useState({
    webp1x: null,
    webp2x: null,
    png1x: null,
    png2x: null
  });

  useEffect(() => {
    const loadImages = () => {
      try {
        // Vite asset URL'lerini oluştur
        const baseUrl = '/src/assets/images/optimized/';
        
        const imagePaths = {
          webp1x: `${baseUrl}${imageName}.webp`,
          webp2x: `${baseUrl}${imageName}@2x.webp`,
          png1x: `${baseUrl}${imageName}.${extension}`,
          png2x: `${baseUrl}${imageName}@2x.${extension}`
        };

        // Development'ta direkt path kullan, production'da asset handling
        if (import.meta.env.DEV) {
          setImageSources(imagePaths);
        } else {
          // Production için asset URL'leri
          setImageSources({
            webp1x: new URL(`../assets/images/optimized/${imageName}.webp`, import.meta.url).href,
            webp2x: new URL(`../assets/images/optimized/${imageName}@2x.webp`, import.meta.url).href,
            png1x: new URL(`../assets/images/optimized/${imageName}.${extension}`, import.meta.url).href,
            png2x: new URL(`../assets/images/optimized/${imageName}@2x.${extension}`, import.meta.url).href
          });
        }
      } catch (error) {
        console.warn(`Could not load optimized images for ${imageName}:`, error);
        // Fallback
        const fallbackPath = `/src/assets/images/${imageName}.${extension}`;
        setImageSources({
          webp1x: null,
          webp2x: null,
          png1x: fallbackPath,
          png2x: fallbackPath
        });
      }
    };

    loadImages();
  }, [imageName, extension]);

  return imageSources;
};
