
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

// Mock data to simulate API response
const TANSEEQ_PROJECTS = [
  {
    id: "tp1",
    name: "Commercial Complex Development",
    location: "Business Bay",
    startDate: "2025-06-01",
    endDate: "2026-02-28",
    status: "Pending"
  },
  {
    id: "tp2",
    name: "Residential Tower Construction",
    location: "Marina District",
    startDate: "2025-07-15",
    endDate: "2026-04-30",
    status: "Planning"
  },
  {
    id: "tp3",
    name: "Smart City Infrastructure",
    location: "Technology Park",
    startDate: "2025-08-01",
    endDate: "2026-07-31",
    status: "Approved"
  },
  {
    id: "tp4",
    name: "Public Transit Hub",
    location: "Central Station",
    startDate: "2025-09-15",
    endDate: "2026-03-31",
    status: "Planning"
  }
];

interface TanseeqProject {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface TanseeqImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (projects: TanseeqProject[]) => void;
}

export default function TanseeqImportModal({ open, onOpenChange, onImport }: TanseeqImportModalProps) {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<TanseeqProject[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set());
  const [fetchComplete, setFetchComplete] = useState(false);
  const { toast } = useToast();

  const handleFetch = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProjects(TANSEEQ_PROJECTS);
      setLoading(false);
      setFetchComplete(true);
    }, 2000);
  };

  const toggleProject = (projectId: string) => {
    const newSelected = new Set(selectedProjects);
    if (newSelected.has(projectId)) {
      newSelected.delete(projectId);
    } else {
      newSelected.add(projectId);
    }
    setSelectedProjects(newSelected);
  };

  const toggleAll = () => {
    if (selectedProjects.size === projects.length) {
      setSelectedProjects(new Set());
    } else {
      setSelectedProjects(new Set(projects.map(p => p.id)));
    }
  };

  const handleImport = () => {
    const selectedProjectsData = projects.filter(p => selectedProjects.has(p.id));
    onImport(selectedProjectsData);
    toast({
      title: "Success",
      description: "Projects imported successfully from Tanseeq API.",
    });
    onOpenChange(false);
    // Reset state
    setProjects([]);
    setSelectedProjects(new Set());
    setFetchComplete(false);
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setProjects([]);
      setSelectedProjects(new Set());
      setFetchComplete(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Import Projects from Tanseeq API</DialogTitle>
          <DialogDescription>
            Click the button below to fetch project data from the Tanseeq system.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {!fetchComplete && (
            <div className="flex justify-center">
              <Button
                onClick={handleFetch}
                disabled={loading}
                className="bg-proscape hover:bg-proscape-dark"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Fetching Projects...
                  </>
                ) : (
                  "Fetch Projects"
                )}
              </Button>
            </div>
          )}

          {fetchComplete && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={selectedProjects.size === projects.length}
                  onCheckedChange={toggleAll}
                />
                <label htmlFor="select-all" className="text-sm font-medium">
                  Select All Projects
                </label>
              </div>

              <div className="border rounded-md">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-2"></th>
                      <th className="px-4 py-2 text-left">Project Name</th>
                      <th className="px-4 py-2 text-left">Location</th>
                      <th className="px-4 py-2 text-left">Start Date</th>
                      <th className="px-4 py-2 text-left">End Date</th>
                      <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id} className="border-b">
                        <td className="px-4 py-2">
                          <Checkbox
                            checked={selectedProjects.has(project.id)}
                            onCheckedChange={() => toggleProject(project.id)}
                          />
                        </td>
                        <td className="px-4 py-2">{project.name}</td>
                        <td className="px-4 py-2">{project.location}</td>
                        <td className="px-4 py-2">{project.startDate}</td>
                        <td className="px-4 py-2">{project.endDate}</td>
                        <td className="px-4 py-2">{project.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          {fetchComplete && (
            <Button
              onClick={handleImport}
              disabled={selectedProjects.size === 0}
              className="bg-proscape hover:bg-proscape-dark"
            >
              Import Selected Projects
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
