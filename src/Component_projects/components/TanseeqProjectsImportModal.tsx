
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function TanseeqProjectsImportModal({
  isOpen,
  onClose,
  onImport,
}: {
  isOpen: boolean;
  onClose: () => void;
  onImport: (projects: any[]) => void;
}) {
  if (!isOpen) return null;

  const handleImport = () => {
    // Mock Tanseeq API import data
    const mockTanseeqProjects = [
      {
        entity: "Tanseeq API Import",
        projectId: "TAN001",
        name: "API Imported Project",
        location: "API Location",
        startDate: "2024-07-01",
        endDate: "2025-01-01",
        status: "Active"
      }
    ];
    
    onImport(mockTanseeqProjects);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Import from Tanseeq API</h2>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>
        
        <div className="space-y-4">
          <p>Import projects directly from the Tanseeq API.</p>
          
          <div>
            <label className="text-sm font-medium text-gray-500">API Endpoint</label>
            <input
              type="text"
              defaultValue="https://api.tanseeq.com/projects"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
              placeholder="API endpoint"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleImport}>Import from API</Button>
        </div>
      </Card>
    </div>
  );
}
