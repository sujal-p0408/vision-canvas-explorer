import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Camera, Zap } from 'lucide-react';

export function HeroSection() {
  const scrollToUpload = () => {
    document.getElementById('upload-sections')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10" />
      
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-6">
        {/* Main heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Computer Vision
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Web Laboratory
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore the fascinating world of computer vision through interactive demos. 
            Upload images and experience cutting-edge algorithms in real-time.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
            <div className="text-center space-y-3">
              <Brain className="w-12 h-12 mx-auto text-primary" />
              <h3 className="text-lg font-semibold">Advanced Algorithms</h3>
              <p className="text-sm text-muted-foreground">
                From basic filters to SIFT features, explore a comprehensive suite of CV techniques
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
            <div className="text-center space-y-3">
              <Camera className="w-12 h-12 mx-auto text-accent" />
              <h3 className="text-lg font-semibold">Real-Time Processing</h3>
              <p className="text-sm text-muted-foreground">
                Upload your images and see instant results with side-by-side comparisons
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
            <div className="text-center space-y-3">
              <Zap className="w-12 h-12 mx-auto text-primary-glow" />
              <h3 className="text-lg font-semibold">Interactive Learning</h3>
              <p className="text-sm text-muted-foreground">
                Hands-on experience with Tesla's self-driving vision and 3D conversion demos
              </p>
            </div>
          </Card>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={scrollToUpload}
          size="lg"
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6"
        >
          Start Exploring
        </Button>
      </div>
    </div>
  );
}