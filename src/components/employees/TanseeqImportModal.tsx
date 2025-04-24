
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, X, CloudDownload } from "lucide-react";
import { mockTanseeqEmployees } from "./tanseeq-mock-data";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedEmployees, setFetchedEmployees] = useState<typeof mockTanseeqEmployees | null>(null);
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleFetch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setFetchedEmployees(mockTanseeqEmployees);
      setSelectedEmployees(new Set(mockTanseeqEmployees.map(emp => emp.id)));
      setIsLoading(false);
    }, 2000);
  };

  const handleImport = () => {
    if (fetchedEmployees) {
      const selectedRecords = fetchedEmployees.filter(emp => 
        selectedEmployees.has(emp.id)
      );
      onImportComplete(selectedRecords);
      toast({
        title: "Import Successful",
        description: `Successfully imported ${selectedRecords.length} employees from Tanseeq.`,
      });
      onOpenChange(false);
    }
  };

  const toggleSelectAll = () => {
    if (fetchedEmployees) {
      if (selectedEmployees.size === fetchedEmployees.length) {
        setSelectedEmployees(new Set());
      } else {
        setSelectedEmployees(new Set(fetchedEmployees.map(emp => emp.id)));
      }
    }
  };

  const toggleEmployee = (id: string) => {
    const newSelected = new Set(selectedEmployees);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedEmployees(newSelected);
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
            Click below to fetch the latest employee data from the Tanseeq system.
          </p>

          <div className="flex justify-center">
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
                <>
                  <CloudDownload className="mr-2 h-4 w-4" />
                  Fetch Employees
                </>
              )}
            </Button>
          </div>

          {fetchedEmployees && (
            <>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="selectAll"
                  checked={selectedEmployees.size === fetchedEmployees.length}
                  onCheckedChange={toggleSelectAll}
                  className="border-proscape data-[state=checked]:bg-proscape"
                />
                <label 
                  htmlFor="selectAll" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Select All
                </label>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3">Select</th>
                      <th scope="col" className="px-4 py-3">Name</th>
                      <th scope="col" className="px-4 py-3">Employee ID</th>
                      <th scope="col" className="px-4 py-3">Role</th>
                      <th scope="col" className="px-4 py-3">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchedEmployees.map((employee) => (
                      <tr key={employee.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <Checkbox 
                            checked={selectedEmployees.has(employee.id)}
                            onCheckedChange={() => toggleEmployee(employee.id)}
                            className="border-proscape data-[state=checked]:bg-proscape"
                          />
                        </td>
                        <td className="px-4 py-3">{employee.name}</td>
                        <td className="px-4 py-3">{employee.employeeId}</td>
                        <td className="px-4 py-3">{employee.role}</td>
                        <td className="px-4 py-3">{employee.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={selectedEmployees.size === 0}
                  className="bg-proscape hover:bg-proscape-dark"
                >
                  Import Selected
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
