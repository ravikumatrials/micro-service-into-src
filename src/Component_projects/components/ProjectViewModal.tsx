
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function ProjectViewModal({
  project,
  isOpen,
  onClose,
}: {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Project Details</h2>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Project Name</label>
            <p className="text-lg">{project.name}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Project ID</label>
              <p>{project.projectId || project.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Entity</label>
              <p>{project.entity}</p>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-500">Location</label>
            <p>{project.location || "Not assigned"}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Start Date</label>
              <p>{project.startDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">End Date</label>
              <p>{project.endDate}</p>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-500">Status</label>
            <p>{project.status}</p>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button onClick={onClose}>Close</Button>
        </div>
      </Card>
    </div>
  );
}
