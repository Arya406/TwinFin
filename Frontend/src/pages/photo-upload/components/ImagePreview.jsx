import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ImagePreview = ({ file, onRemove, onCropChange }) => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [imageUrl, setImageUrl] = useState(null);
  const imageRef = useRef(null);

  React.useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const handleRotate = () => {
    const newRotation = (rotation + 90) % 360;
    setRotation(newRotation);
    if (onCropChange) {
      onCropChange({ rotation: newRotation, zoom });
    }
  };

  const handleZoomChange = (e) => {
    const newZoom = parseFloat(e?.target?.value);
    setZoom(newZoom);
    if (onCropChange) {
      onCropChange({ rotation, zoom: newZoom });
    }
  };

  const handleReset = () => {
    setRotation(0);
    setZoom(1);
    if (onCropChange) {
      onCropChange({ rotation: 0, zoom: 1 });
    }
  };

  if (!file || !imageUrl) return null;

  return (
    <div className="w-full space-y-6">
      {/* Preview Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Photo Preview</h3>
          <p className="text-text-secondary text-sm">Adjust your photo for the best results</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-text-secondary hover:text-error"
        >
          <Icon name="X" size={20} />
        </Button>
      </div>
      {/* Image Preview Container */}
      <div className="relative bg-muted rounded-xl overflow-hidden">
        <div className="aspect-square max-w-md mx-auto relative overflow-hidden">
          <div
            ref={imageRef}
            className="w-full h-full flex items-center justify-center"
            style={{
              transform: `rotate(${rotation}deg) scale(${zoom})`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <Image
              src={imageUrl}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          {/* Crop Guide Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full border-2 border-primary/30 rounded-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 border border-primary/50 rounded-full" />
          </div>
        </div>
      </div>
      {/* Controls */}
      <div className="space-y-4">
        {/* Zoom Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-text-primary">Zoom</label>
            <span className="text-sm text-text-secondary">{Math.round(zoom * 100)}%</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="ZoomOut" size={16} className="text-text-secondary" />
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={zoom}
              onChange={handleZoomChange}
              className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <Icon name="ZoomIn" size={16} className="text-text-secondary" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCw"
            iconPosition="left"
            onClick={handleRotate}
          >
            Rotate
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
      {/* File Info */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">File name:</span>
          <span className="text-text-primary font-medium truncate ml-2">{file?.name}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">File size:</span>
          <span className="text-text-primary">{(file?.size / (1024 * 1024))?.toFixed(2)} MB</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">File type:</span>
          <span className="text-text-primary uppercase">{file?.type?.split('/')?.[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;