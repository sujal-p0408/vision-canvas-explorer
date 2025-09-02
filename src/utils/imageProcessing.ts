// Image processing utilities using Canvas API
export const processImageWithCanvas = (
  imageUrl: string,
  processingType: string
): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      switch (processingType) {
        case 'filters':
          applyGrayscale(data);
          break;
        case 'binary-conversion':
          applyBinaryThreshold(data);
          break;
        case 'edge-detection':
          applyEdgeDetection(imageData, canvas.width, canvas.height);
          break;
        case 'feature-detection':
          applyFeatureHighlight(data);
          break;
        case 'segmentation':
          applySegmentation(data);
          break;
        case 'color-space-conversion':
          applyHSVConversion(data);
          break;
        case 'image-filtering':
          applyBlur(imageData, canvas.width, canvas.height);
          break;
        case 'corner-detection':
          applyCornerHighlight(data);
          break;
        case '2d-3d-demo':
          apply3DEffect(data);
          break;
        case 'texture-analysis':
          applyTextureAnalysis(data);
          break;
        case 'tesla-demo':
          applyObjectDetection(data);
          break;
        default:
          applyGrayscale(data);
      }
      
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL());
    };
    
    img.src = imageUrl;
  });
};

// Processing functions
const applyGrayscale = (data: Uint8ClampedArray) => {
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }
};

const applyBinaryThreshold = (data: Uint8ClampedArray) => {
  const threshold = 128;
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    const binary = gray > threshold ? 255 : 0;
    data[i] = binary;
    data[i + 1] = binary;
    data[i + 2] = binary;
  }
};

const applyEdgeDetection = (imageData: ImageData, width: number, height: number) => {
  const data = imageData.data;
  const output = new Uint8ClampedArray(data);
  
  // Simple Sobel edge detection
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      
      // Get surrounding pixels
      const tl = getGray(data, (y - 1) * width + (x - 1));
      const tm = getGray(data, (y - 1) * width + x);
      const tr = getGray(data, (y - 1) * width + (x + 1));
      const ml = getGray(data, y * width + (x - 1));
      const mr = getGray(data, y * width + (x + 1));
      const bl = getGray(data, (y + 1) * width + (x - 1));
      const bm = getGray(data, (y + 1) * width + x);
      const br = getGray(data, (y + 1) * width + (x + 1));
      
      // Sobel operators
      const sobelX = (tr + 2 * mr + br) - (tl + 2 * ml + bl);
      const sobelY = (bl + 2 * bm + br) - (tl + 2 * tm + tr);
      const magnitude = Math.sqrt(sobelX * sobelX + sobelY * sobelY);
      
      output[idx] = magnitude;
      output[idx + 1] = magnitude;
      output[idx + 2] = magnitude;
      output[idx + 3] = 255;
    }
  }
  
  for (let i = 0; i < data.length; i++) {
    data[i] = output[i];
  }
};

const getGray = (data: Uint8ClampedArray, idx: number) => {
  const i = idx * 4;
  return data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
};

const applyFeatureHighlight = (data: Uint8ClampedArray) => {
  // Enhance red channel for feature highlighting
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    if (gray > 150) { // Highlight bright features
      data[i] = Math.min(255, data[i] + 50); // Enhance red
      data[i + 1] = Math.max(0, data[i + 1] - 30);
      data[i + 2] = Math.max(0, data[i + 2] - 30);
    }
  }
};

const applySegmentation = (data: Uint8ClampedArray) => {
  // Simple color-based segmentation
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Segment based on color intensity
    if (r + g + b > 400) {
      // Bright regions - keep original
    } else if (r + g + b > 200) {
      // Medium regions - make blue
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 255;
    } else {
      // Dark regions - make black
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
    }
  }
};

const applyHSVConversion = (data: Uint8ClampedArray) => {
  // Enhance saturation for HSV demonstration
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] / 255;
    const g = data[i + 1] / 255;
    const b = data[i + 2] / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    // Enhance saturation
    if (diff > 0) {
      const saturation = diff / max;
      const enhancedSat = Math.min(1, saturation * 1.5);
      
      const factor = enhancedSat / saturation;
      data[i] = Math.min(255, (r + (r - min) * (factor - 1)) * 255);
      data[i + 1] = Math.min(255, (g + (g - min) * (factor - 1)) * 255);
      data[i + 2] = Math.min(255, (b + (b - min) * (factor - 1)) * 255);
    }
  }
};

const applyBlur = (imageData: ImageData, width: number, height: number) => {
  const data = imageData.data;
  const output = new Uint8ClampedArray(data);
  
  // Simple box blur
  const blur = 2;
  for (let y = blur; y < height - blur; y++) {
    for (let x = blur; x < width - blur; x++) {
      let r = 0, g = 0, b = 0, count = 0;
      
      for (let dy = -blur; dy <= blur; dy++) {
        for (let dx = -blur; dx <= blur; dx++) {
          const idx = ((y + dy) * width + (x + dx)) * 4;
          r += data[idx];
          g += data[idx + 1];
          b += data[idx + 2];
          count++;
        }
      }
      
      const idx = (y * width + x) * 4;
      output[idx] = r / count;
      output[idx + 1] = g / count;
      output[idx + 2] = b / count;
      output[idx + 3] = 255;
    }
  }
  
  for (let i = 0; i < data.length; i++) {
    data[i] = output[i];
  }
};

const applyCornerHighlight = (data: Uint8ClampedArray) => {
  // Highlight corners with green overlay
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    if (gray > 180) { // Potential corner points
      data[i] = Math.max(0, data[i] - 50);
      data[i + 1] = Math.min(255, data[i + 1] + 100); // Enhance green
      data[i + 2] = Math.max(0, data[i + 2] - 50);
    }
  }
};

const apply3DEffect = (data: Uint8ClampedArray) => {
  // Create pseudo-3D effect with depth-based color shift
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    const depth = gray / 255;
    
    // Apply depth-based color transformation
    data[i] = Math.min(255, data[i] + depth * 30); // Red channel for depth
    data[i + 1] = Math.max(0, data[i + 1] - depth * 20);
    data[i + 2] = Math.min(255, data[i + 2] + depth * 40); // Blue for depth
  }
};

const applyTextureAnalysis = (data: Uint8ClampedArray) => {
  // Enhance texture patterns
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Create texture pattern based on intensity variations
    const intensity = (r + g + b) / 3;
    const pattern = Math.sin(intensity * 0.1) * 50;
    
    data[i] = Math.max(0, Math.min(255, r + pattern));
    data[i + 1] = Math.max(0, Math.min(255, g + pattern));
    data[i + 2] = Math.max(0, Math.min(255, b + pattern));
  }
};

const applyObjectDetection = (data: Uint8ClampedArray) => {
  // Simulate object detection with bounding box overlay
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Detect car-like colors (darker regions) and highlight
    if (r < 100 && g < 100 && b < 100) {
      data[i] = Math.min(255, r + 100); // Add red overlay for detected objects
      data[i + 1] = g;
      data[i + 2] = b;
    }
  }
};
