
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, User, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface Employee {
  id: number;
  name: string;
  imageUrl: string;
}

interface FaceCheckInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  projects: { id: number; name: string }[];
  onComplete: () => void;
}

const FaceCheckInDialog = ({
  open,
  onOpenChange,
  employee,
  projects,
  onComplete
}: FaceCheckInDialogProps) => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState("");
  const [showProjectSelect, setShowProjectSelect] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  // Reset states when dialog opens
  useEffect(() => {
    if (open) {
      setStep(1);
      setProgress(0);
      setSelectedProject("");
      setShowProjectSelect(false);
      setIsProcessing(false);
      setIsVerified(false);
    }
  }, [open]);
  
  // Simulate progress for face detection
  useEffect(() => {
    if (open && step === 1) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setStep(2);
            setIsProcessing(true);
            // Simulate face processing delay
            setTimeout(() => {
              setIsProcessing(false);
              setIsVerified(true);
              // Simulate location detection showing multiple projects
              setTimeout(() => {
                setShowProjectSelect(true);
              }, 1000);
            }, 2000);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      
      return () => clearInterval(timer);
    }
  }, [open, step]);
  
  const handleComplete = () => {
    onComplete();
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <Camera className="mr-2 h-6 w-6" />
            Face Check-In
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          {/* Employee info */}
          {employee && (
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-proscape">
                <img 
                  src={employee.imageUrl} 
                  alt={employee.name}
                  className="h-full w-full object-cover" 
                />
              </div>
              <div>
                <h3 className="text-lg font-medium">{employee.name}</h3>
                <p className="text-gray-500">ID: {employee.id}</p>
              </div>
            </div>
          )}
          
          {/* Face capture area */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-gray-100 h-64 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                <Camera className="h-16 w-16 text-gray-400 mb-2" />
                <p className="text-gray-500 text-center">
                  Position your face in the center
                </p>
                <Progress value={progress} className="w-2/3 mt-4" />
              </div>
              <p className="text-sm text-gray-500 text-center">
                Please look directly at the camera for facial recognition
              </p>
            </div>
          )}
          
          {/* Face verification */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-gray-100 h-64 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden">
                {isProcessing ? (
                  <div className="space-y-2">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-proscape mx-auto"></div>
                    <p className="text-gray-500 text-center">Processing...</p>
                  </div>
                ) : isVerified ? (
                  <div className="space-y-2 text-center">
                    <div className="bg-green-100 text-green-600 rounded-full p-2 w-fit mx-auto">
                      <Check className="h-10 w-10" />
                    </div>
                    <div>
                      <p className="font-medium text-green-600">Face Verified</p>
                      <p className="text-gray-500 text-sm">Location detected</p>
                    </div>
                  </div>
                ) : null}
              </div>
              
              {showProjectSelect && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Multiple projects detected at this location. Please select:
                  </label>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map(project => (
                        <SelectItem key={project.id} value={project.id.toString()}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {step === 2 && isVerified && (
            <Button 
              onClick={handleComplete}
              className="bg-proscape hover:bg-proscape-dark"
              disabled={showProjectSelect && !selectedProject}
            >
              Confirm Check-In
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FaceCheckInDialog;
