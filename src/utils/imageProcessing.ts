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
        // Unit III - Neural Network for Computer Vision
        case 'cnn-convolution':
          applyCNNConvolution(imageData, canvas.width, canvas.height);
          break;
        case 'kernel-visualization':
          applyKernelVisualization(data);
          break;
        case 'padding-demo':
          applyPaddingDemo(data, canvas.width, canvas.height);
          break;
        case 'pooling':
          applyPooling(imageData, canvas.width, canvas.height);
          break;
        case 'feature-maps':
          applyFeatureMaps(data);
          break;
        case 'relu-activation':
          applyReLU(data);
          break;
        case 'sigmoid-activation':
          applySigmoid(data);
          break;
        case 'tanh-activation':
          applyTanh(data);
          break;
        case 'sparrow-surveillance':
          applySurveillanceDetection(data);
          break;
        
        // Unit IV - Object Detection & Recognition
        case 'hog-detection':
          applyHOG(imageData, canvas.width, canvas.height);
          break;
        case 'hough-lines':
          applyHoughLines(imageData, canvas.width, canvas.height);
          break;
        case 'hough-circles':
          applyHoughCircles(data, canvas.width, canvas.height);
          break;
        case 'rcnn-demo':
          applyRCNN(data);
          break;
        case 'simple-object-recognition':
          applySimpleObjectRecognition(data);
          break;
        case 'gan-demo':
          applyGAN(data);
          break;
        case 'face-frontalization':
          applyFaceFrontalization(data);
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

// ============= UNIT III: Neural Network Functions =============

// CNN Convolution - Apply edge detection kernel
const applyCNNConvolution = (imageData: ImageData, width: number, height: number) => {
  const data = imageData.data;
  const output = new Uint8ClampedArray(data);
  
  // 3x3 edge detection kernel
  const kernel = [
    [-1, -1, -1],
    [-1,  8, -1],
    [-1, -1, -1]
  ];
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let r = 0, g = 0, b = 0;
      
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const idx = ((y + ky) * width + (x + kx)) * 4;
          const weight = kernel[ky + 1][kx + 1];
          r += data[idx] * weight;
          g += data[idx + 1] * weight;
          b += data[idx + 2] * weight;
        }
      }
      
      const idx = (y * width + x) * 4;
      output[idx] = Math.max(0, Math.min(255, r));
      output[idx + 1] = Math.max(0, Math.min(255, g));
      output[idx + 2] = Math.max(0, Math.min(255, b));
      output[idx + 3] = 255;
    }
  }
  
  for (let i = 0; i < data.length; i++) {
    data[i] = output[i];
  }
};

// Kernel Visualization - Show different kernel effects
const applyKernelVisualization = (data: Uint8ClampedArray) => {
  // Sharpen kernel effect
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Enhance edges
    data[i] = Math.min(255, r * 1.5);
    data[i + 1] = Math.min(255, g * 1.5);
    data[i + 2] = Math.min(255, b * 1.5);
  }
};

// Padding Demo - Show border with padding effect
const applyPaddingDemo = (data: Uint8ClampedArray, width: number, height: number) => {
  const padding = 20;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      
      // Add colored border to show padding
      if (x < padding || x >= width - padding || y < padding || y >= height - padding) {
        data[idx] = 255;     // Red border
        data[idx + 1] = 100;
        data[idx + 2] = 100;
      }
    }
  }
};

// Pooling - Max pooling demonstration
const applyPooling = (imageData: ImageData, width: number, height: number) => {
  const data = imageData.data;
  const output = new Uint8ClampedArray(data);
  const poolSize = 4;
  
  for (let y = 0; y < height; y += poolSize) {
    for (let x = 0; x < width; x += poolSize) {
      let maxR = 0, maxG = 0, maxB = 0;
      
      // Find max in pool window
      for (let py = 0; py < poolSize && y + py < height; py++) {
        for (let px = 0; px < poolSize && x + px < width; px++) {
          const idx = ((y + py) * width + (x + px)) * 4;
          maxR = Math.max(maxR, data[idx]);
          maxG = Math.max(maxG, data[idx + 1]);
          maxB = Math.max(maxB, data[idx + 2]);
        }
      }
      
      // Apply max to entire pool
      for (let py = 0; py < poolSize && y + py < height; py++) {
        for (let px = 0; px < poolSize && x + px < width; px++) {
          const idx = ((y + py) * width + (x + px)) * 4;
          output[idx] = maxR;
          output[idx + 1] = maxG;
          output[idx + 2] = maxB;
          output[idx + 3] = 255;
        }
      }
    }
  }
  
  for (let i = 0; i < data.length; i++) {
    data[i] = output[i];
  }
};

// Feature Maps - Visualize different feature extractions
const applyFeatureMaps = (data: Uint8ClampedArray) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Create different feature channels
    const horizontal = Math.abs(r - g);
    const vertical = Math.abs(g - b);
    const diagonal = Math.abs(r - b);
    
    data[i] = horizontal;
    data[i + 1] = vertical;
    data[i + 2] = diagonal;
  }
};

// ReLU Activation Function
const applyReLU = (data: Uint8ClampedArray) => {
  const threshold = 128;
  for (let i = 0; i < data.length; i += 4) {
    // Apply ReLU: max(0, x - threshold)
    data[i] = Math.max(0, data[i] - threshold) * 2;
    data[i + 1] = Math.max(0, data[i + 1] - threshold) * 2;
    data[i + 2] = Math.max(0, data[i + 2] - threshold) * 2;
  }
};

// Sigmoid Activation Function
const applySigmoid = (data: Uint8ClampedArray) => {
  for (let i = 0; i < data.length; i += 4) {
    // Apply sigmoid function for smooth activation
    data[i] = 255 / (1 + Math.exp(-(data[i] - 128) / 25));
    data[i + 1] = 255 / (1 + Math.exp(-(data[i + 1] - 128) / 25));
    data[i + 2] = 255 / (1 + Math.exp(-(data[i + 2] - 128) / 25));
  }
};

// Tanh Activation Function
const applyTanh = (data: Uint8ClampedArray) => {
  for (let i = 0; i < data.length; i += 4) {
    // Apply tanh function
    const tanhR = Math.tanh((data[i] - 128) / 64);
    const tanhG = Math.tanh((data[i + 1] - 128) / 64);
    const tanhB = Math.tanh((data[i + 2] - 128) / 64);
    
    data[i] = (tanhR + 1) * 127.5;
    data[i + 1] = (tanhG + 1) * 127.5;
    data[i + 2] = (tanhB + 1) * 127.5;
  }
};

// Sparrow Surveillance - Autonomous detection overlay
const applySurveillanceDetection = (data: Uint8ClampedArray) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = (r + g + b) / 3;
    
    // Highlight objects with thermal-vision style
    if (brightness > 100) {
      const heat = (brightness - 100) / 155;
      data[i] = Math.min(255, r + heat * 100);     // Red for heat
      data[i + 1] = Math.max(0, g - heat * 50);
      data[i + 2] = Math.max(0, b - heat * 100);
    }
  }
};

// ============= UNIT IV: Object Detection Functions =============

// HOG (Histogram of Oriented Gradients)
const applyHOG = (imageData: ImageData, width: number, height: number) => {
  const data = imageData.data;
  const output = new Uint8ClampedArray(data);
  
  // Calculate gradients
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      
      // Gradient in x direction
      const gx = getGray(data, y * width + (x + 1)) - getGray(data, y * width + (x - 1));
      // Gradient in y direction
      const gy = getGray(data, (y + 1) * width + x) - getGray(data, (y - 1) * width + x);
      
      const magnitude = Math.sqrt(gx * gx + gy * gy);
      const angle = Math.atan2(gy, gx);
      
      // Color code by gradient direction
      const hue = ((angle + Math.PI) / (2 * Math.PI)) * 255;
      output[idx] = magnitude * Math.abs(Math.cos(angle));
      output[idx + 1] = magnitude * Math.abs(Math.sin(angle));
      output[idx + 2] = hue;
      output[idx + 3] = 255;
    }
  }
  
  for (let i = 0; i < data.length; i++) {
    data[i] = output[i];
  }
};

// Hough Transform - Line Detection
const applyHoughLines = (imageData: ImageData, width: number, height: number) => {
  const data = imageData.data;
  
  // First apply edge detection
  applyEdgeDetection(imageData, width, height);
  
  // Enhance detected edges with green highlight
  for (let i = 0; i < data.length; i += 4) {
    const intensity = data[i];
    if (intensity > 100) {
      data[i] = 0;
      data[i + 1] = 255;  // Green for detected lines
      data[i + 2] = 0;
    }
  }
};

// Hough Transform - Circle Detection
const applyHoughCircles = (data: Uint8ClampedArray, width: number, height: number) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Detect circular patterns based on color uniformity
    const avg = (r + g + b) / 3;
    const variance = Math.abs(r - avg) + Math.abs(g - avg) + Math.abs(b - avg);
    
    if (variance < 30) {  // Uniform regions might be circles
      data[i] = 255;
      data[i + 1] = 165;  // Orange highlight for circles
      data[i + 2] = 0;
    }
  }
};

// R-CNN Object Detection
const applyRCNN = (data: Uint8ClampedArray) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Simulate region proposals with bounding box highlighting
    const intensity = (r + g + b) / 3;
    
    if (intensity > 120 && intensity < 200) {
      // Highlight potential objects
      data[i] = Math.min(255, r + 80);
      data[i + 1] = g;
      data[i + 2] = Math.min(255, b + 40);
    }
  }
};

// Simple Object Recognition
const applySimpleObjectRecognition = (data: Uint8ClampedArray) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Classify by color dominance
    if (r > g && r > b) {
      // Red objects
      data[i] = 255;
      data[i + 1] = 0;
      data[i + 2] = 0;
    } else if (g > r && g > b) {
      // Green objects
      data[i] = 0;
      data[i + 1] = 255;
      data[i + 2] = 0;
    } else if (b > r && b > g) {
      // Blue objects
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 255;
    }
  }
};

// GAN (Generative Adversarial Network) - Style transfer effect
const applyGAN = (data: Uint8ClampedArray) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Apply artistic style transformation
    const avg = (r + g + b) / 3;
    const noise = Math.random() * 30 - 15;
    
    data[i] = Math.max(0, Math.min(255, avg * 1.2 + noise + (r - avg) * 0.8));
    data[i + 1] = Math.max(0, Math.min(255, avg * 1.1 + noise + (g - avg) * 0.8));
    data[i + 2] = Math.max(0, Math.min(255, avg * 0.9 + noise + (b - avg) * 0.8));
  }
};

// Face Frontalization
const applyFaceFrontalization = (data: Uint8ClampedArray) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Enhance facial features (skin tones)
    const isSkinTone = r > 95 && g > 40 && b > 20 && r > g && r > b;
    
    if (isSkinTone) {
      // Enhance and normalize skin tones
      data[i] = Math.min(255, r * 1.1);
      data[i + 1] = Math.min(255, g * 1.05);
      data[i + 2] = Math.min(255, b * 1.05);
    } else {
      // Sharpen non-skin features
      data[i] = r * 0.9;
      data[i + 1] = g * 0.9;
      data[i + 2] = b * 0.9;
    }
  }
};
