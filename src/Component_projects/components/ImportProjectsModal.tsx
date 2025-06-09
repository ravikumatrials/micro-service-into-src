
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function ImportProjectsModal({
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
    // Mock import data
    const mockImportedProjects = [
      {
        entity: "New Entity",
        projectId: "IMP001",
        name: "Imported Project 1",
        location: "New Location",
        startDate: "2024-06-01",
        endDate: "2024-12-01",
        status: "Active"
      }
    ];
    
    onImport(mockImportedProjects);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Import Projects</h2>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>
        
        <div className="space-y-4">
          <p>Select a file to import projects from CSV or Excel format.</p>
          
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
          />
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleImport}>Import</Button>
        </div>
      </Card>
    </div>
  );
}
