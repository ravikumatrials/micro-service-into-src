
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, X } from "lucide-react";
import { mockTanseeqEmployees } from "./tanseeq-mock-data";
import { useToast } from "@/hooks/use-toast";

interface TanseeqImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete: (employees: typeof mockTanseeqEmployees) => void;
}

export function TanseeqImportModal({ 
  open, 
  onOpenChange,
  onImportComplete 
}: TanseeqImportModalProps) {
  const [projectId, setProjectId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedEmployees, setFetchedEmployees] = useState<typeof mockTanseeqEmployees | null>(null);
  const { toast } = useToast();

  const handleFetch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setFetchedEmployees(mockTanseeqEmployees);
      setIsLoading(false);
    }, 3000);
  };

  const handleImport = () => {
    if (fetchedEmployees) {
      onImportComplete(fetchedEmployees);
      toast({
        title: "Import Successful",
        description: `Successfully imported ${fetchedEmployees.length} employees from Tanseeq.`,
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Import Employees from Tanseeq API</DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-sm text-gray-600">
            Use this tool to import employee records directly from the Tanseeq system.
          </p>

          <div>
            <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-1">
              Department/Project ID (Optional)
            </label>
            <div className="flex gap-4">
              <Input
                id="projectId"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                placeholder="Enter ID to filter results"
                className="flex-1"
              />
              <Button 
                onClick={handleFetch}
                disabled={isLoading}
                className="bg-proscape hover:bg-proscape-dark"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Fetching...
                  </>
                ) : (
                  "Fetch from Tanseeq API"
                )}
              </Button>
            </div>
          </div>

          {fetchedEmployees && (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3">Name</th>
                    <th scope="col" className="px-4 py-3">Employee ID</th>
                    <th scope="col" className="px-4 py-3">Role</th>
                    <th scope="col" className="px-4 py-3">Project</th>
                    <th scope="col" className="px-4 py-3">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {fetchedEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{employee.name}</td>
                      <td className="px-4 py-3">{employee.employeeId}</td>
                      <td className="px-4 py-3">{employee.role}</td>
                      <td className="px-4 py-3">{employee.project}</td>
                      <td className="px-4 py-3">{employee.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {fetchedEmployees && (
            <div className="flex justify-end">
              <Button
                onClick={handleImport}
                className="bg-green-600 hover:bg-green-700"
              >
                Import Selected Records
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
