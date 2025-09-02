export const unit1Options = [
  { value: '2d-3d-demo', label: '🎯 2D/3D Vision Demo' },
  { value: 'filters', label: '🎨 Filters (Grayscale, Blur, Sharpen)' },
  { value: 'binary-conversion', label: '⚫ Binary Image Conversion' },
  { value: 'feature-detection', label: '🔍 Feature Detection' },
  { value: 'texture-analysis', label: '🧩 Texture Analysis (LBP)' },
  { value: 'shape-detection', label: '📐 Shape Detection' },
  { value: 'segmentation', label: '✂️ Segmentation' },
  { value: 'model-fitting', label: '📏 Model Fitting' },
  { value: 'probabilistic-models', label: '🎲 Probabilistic Models Demo' },
  { value: 'color-space-conversion', label: '🌈 Color Space Conversion' }
];

export const unit2Options = [
  { value: 'image-formation', label: '🖼️ Image Formation & Basic Processing' },
  { value: 'image-filtering', label: '🔧 Image Filtering' },
  { value: 'edge-detection', label: '📊 Edge Detection (Canny, Sobel)' },
  { value: 'pca', label: '📉 Principal Component Analysis (PCA)' },
  { value: 'corner-detection', label: '📍 Corner Detection (Harris)' },
  { value: 'sift', label: '🎯 SIFT Features' },
  { value: 'surf', label: '🌊 SURF Features' },
  { value: 'tesla-demo', label: '🚗 Tesla Case Study: Car Detection' }
];

export const caseStudies = {
  unit1: {
    title: "Case Study: 2D to Pseudo-3D Conversion",
    description: "Experience how a simple 2D image can be transformed into a pseudo-3D effect using depth estimation and perspective transformation techniques."
  },
  unit2: {
    title: "Case Study: Tesla's Self-Driving Vision",
    description: "Discover how Tesla uses computer vision for autonomous driving by detecting and highlighting vehicles in traffic images using advanced object detection algorithms."
  }
};