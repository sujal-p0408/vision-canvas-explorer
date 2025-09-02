import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Download, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadSectionProps {
  title: string;
  description: string;
  options: { value: string; label: string }[];
  unitType: 'unit1' | 'unit2';
}

export function ImageUploadSection({ title, description, options, unitType }: ImageUploadSectionProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const event = { target: { files: [file] } } as any;
      handleFileUpload(event);
    }
  };

  const processImage = async () => {
    if (!uploadedImage || !selectedOption) return;
    
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For now, just copy the original image as processed
    // This will be replaced with actual CV processing
    setProcessedImage(uploadedImage);
    
    setIsProcessing(false);
    
    toast({
      title: "Processing complete",
      description: `Applied ${selectedOption} to your image`
    });
  };

  const downloadProcessedImage = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = `processed_${selectedOption}.png`;
      link.click();
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50 shadow-elevated">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-gradient-upload hover:border-primary/50 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          {uploadedImage ? (
            <div className="space-y-4">
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="max-w-full max-h-48 mx-auto rounded-lg shadow-lg"
              />
              <p className="text-sm text-muted-foreground">Click to upload a different image</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
              <div>
                <p className="text-lg font-medium">Drop your image here</p>
                <p className="text-sm text-muted-foreground">or click to browse (max 10MB)</p>
              </div>
            </div>
          )}
        </div>

        {/* Options Selection */}
        {uploadedImage && (
          <div className="space-y-4">
            <Select value={selectedOption} onValueChange={setSelectedOption}>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder="Select a computer vision technique" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={processImage}
              disabled={!selectedOption || isProcessing}
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              {isProcessing ? 'Processing...' : 'Apply Processing'}
            </Button>
          </div>
        )}

        {/* Results */}
        {processedImage && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Results</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-center">Original</p>
                <img
                  src={uploadedImage}
                  alt="Original"
                  className="w-full rounded-lg border border-border"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-center">Processed</p>
                <img
                  src={processedImage}
                  alt="Processed"
                  className="w-full rounded-lg border border-border"
                />
              </div>
            </div>
            
            <Button
              onClick={downloadProcessedImage}
              variant="outline"
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Processed Image
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}