import { HeroSection } from '@/components/HeroSection';
import { ImageUploadSection } from '@/components/ImageUploadSection';
import { unit3Options, unit4Options, caseStudies } from '@/data/cvOptions';
import { Card } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Upload Sections */}
      <div id="upload-sections" className="container mx-auto px-6 py-16 space-y-16">
        {/* Unit III Section */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Unit III: Neural Networks</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Neural Network fundamentals and CNN components: kernels, padding, aggregation, feature maps, and activation functions
            </p>
          </div>

          <ImageUploadSection
            title="🧠 Unit III: Neural Network for Computer Vision"
            description="Upload an image and explore CNN operations including convolution, pooling, and activation functions"
            options={unit3Options}
            unitType="unit3"
          />
        </div>

        {/* Unit IV Section */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Unit IV: Object Detection & Recognition</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Detection methods: HOG, R-CNN, Hough transforms, and Generative Adversarial Networks (GANs)
            </p>
          </div>

          <ImageUploadSection
            title="🔍 Unit IV: Object Detection & Recognition"
            description="Experiment with advanced detection methods and GANs for object recognition and face generation"
            options={unit4Options}
            unitType="unit4"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            Computer Vision Web Laboratory - Explore the future of visual AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
