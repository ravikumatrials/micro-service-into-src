
import React, { useRef, useEffect, useState } from 'react';
import { Camera, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaceScannerProps {
  onCapture: (imageBlob: Blob) => void;
  onCancel: () => void;
}

export const FaceScanner = ({ onCapture, onCancel }: FaceScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        setIsScanning(true);
      } catch (err) {
        setError("Failed to access camera. Please ensure camera permissions are granted.");
        console.error("Camera access error:", err);
      }
    };

    startCamera();

    // Cleanup
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current video frame to canvas
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (blob) {
        setIsCaptured(true);
        onCapture(blob);
        
        // Stop camera after successful capture
        const stream = video.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      }
    }, 'image/jpeg', 0.8);
  };

  return (
    <div className="space-y-4">
      <div className={cn(
        "relative w-full max-w-2xl mx-auto aspect-video bg-black rounded-lg overflow-hidden",
        !isScanning && "bg-gray-900"
      )}>
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <p className="text-center p-4">{error}</p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={cn(
                "w-full h-full object-cover",
                isCaptured && "hidden"
              )}
            />
            <canvas ref={canvasRef} className="hidden" />
            
            {isScanning && !isCaptured && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-64 h-64 border-4 border-white rounded-full opacity-50" />
                <p className="text-white mt-4">Position face within the circle</p>
              </div>
            )}
            
            {isCaptured && (
              <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                  <p className="mt-2 font-bold">Face Captured Successfully</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {!isCaptured && !error && (
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCapture}
            disabled={!isScanning}
            className="bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
          >
            Capture
          </button>
        </div>
      )}
    </div>
  );
};
