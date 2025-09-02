import { HeroSection } from '@/components/HeroSection';
import { ImageUploadSection } from '@/components/ImageUploadSection';
import { unit1Options, unit2Options, caseStudies } from '@/data/cvOptions';
import { Card } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Upload Sections */}
      <div id="upload-sections" className="container mx-auto px-6 py-16 space-y-16">
        {/* Unit I Section */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Unit I Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore fundamental computer vision concepts including 2D/3D vision, filters, feature detection, and more
            </p>
          </div>

          <ImageUploadSection
            title="🎯 Unit I: Core Vision Techniques"
            description="Upload an image and select from various computer vision algorithms to see them in action"
            options={unit1Options}
            unitType="unit1"
          />
        </div>

        {/* Unit II Section */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Unit II Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced image processing techniques including edge detection, feature matching, and real-world applications
            </p>
          </div>

          <ImageUploadSection
            title="🚗 Unit II: Advanced Processing"
            description="Experience cutting-edge computer vision techniques used in autonomous vehicles and modern AI systems"
            options={unit2Options}
            unitType="unit2"
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
