import { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage?: File | null;
  onClear?: () => void;
}

export const ImageUpload = ({ onImageSelect, selectedImage, onClear }: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const openCamera = () => {
    cameraInputRef.current?.click();
  };

  if (selectedImage) {
    return (
      <Card className="relative p-4 shadow-card-soft">
        <div className="relative">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected meal"
            className="w-full max-h-64 object-cover rounded-lg"
          />
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={onClear}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Ready to analyze: {selectedImage.name}
        </p>
      </Card>
    );
  }

  return (
    <Card 
      className={`p-8 border-2 border-dashed transition-all duration-300 cursor-pointer shadow-card-soft ${
        dragActive 
          ? 'border-health-primary bg-health-light' 
          : 'border-border hover:border-health-primary hover:bg-health-light/50'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="p-4 bg-health-gradient rounded-full">
          <Upload className="h-8 w-8 text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Upload Your Meal Photo</h3>
          <p className="text-muted-foreground text-sm">
            Drag and drop an image here, or click to browse
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              openFileDialog();
            }}
          >
            <Upload className="h-4 w-4 mr-2" />
            Browse Files
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              openCamera();
            }}
          >
            <Camera className="h-4 w-4 mr-2" />
            Take Photo
          </Button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
    </Card>
  );
};