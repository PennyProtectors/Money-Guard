import React from 'react';
import { useOptimizedImage } from '../../hooks/useOptimizedImage';

const OptimizedImage = ({ 
  imageName, 
  alt, 
  className, 
  extension = 'png',
  loading = 'lazy',
  ...props 
}) => {
  const { webp1x, webp2x, png1x, png2x } = useOptimizedImage(imageName, extension);

  if (!png1x) {
    return <div className={className} style={{ backgroundColor: '#f0f0f0' }} />;
  }

  return (
    <picture>
      {webp1x && webp2x && (
        <source 
          srcSet={`${webp1x} 1x, ${webp2x} 2x`} 
          type="image/webp" 
        />
      )}
      <img 
        src={png1x}
        srcSet={png2x ? `${png1x} 1x, ${png2x} 2x` : png1x}
        alt={alt}
        className={className}
        loading={loading}
        style={{
          imageRendering: '-webkit-optimize-contrast',
          imageRendering: 'crisp-edges'
        }}
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;