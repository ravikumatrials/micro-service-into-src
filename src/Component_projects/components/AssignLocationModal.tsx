
import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function AssignLocationModal({
  project,
  isOpen,
  onClose,
  onSave,
}: {
  project: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (projectId: number, location: string) => void;
}) {
  const [location, setLocation] = useState(project?.location || "");

  if (!isOpen || !project) return null;

  const handleSave = () => {
    onSave(project.id, location);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Assign Location</h2>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Project</label>
            <p className="text-lg">{project.name}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-500">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
              placeholder="Enter location"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Location</Button>
        </div>
      </Card>
    </div>
  );
}
