
import { Eye, MapPin } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function formatDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function ProjectTable({
  projects,
  onView,
  onDelete,
  onAssignLocation,
}: {
  projects: any[];
  onView: (p: any) => void;
  onDelete: (p: any) => void;
  onAssignLocation: (p: any) => void;
}) {
  return (
    <Card className="p-0 overflow-x-auto shadow-sm">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="text-xs uppercase bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3">Entity</th>
            <th className="px-4 py-3">Project ID</th>
            <th className="px-4 py-3">Project Name</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Start Date</th>
            <th className="px-4 py-3">End Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length ? (
            projects.map((project) => (
              <tr key={project.id} className="border-b last:border-0 hover:bg-gray-50">
                {/* Entity */}
                <td className="px-4 py-3">{project.entity || "N/A"}</td>
                
                {/* Project ID */}
                <td className="px-4 py-3">{project.projectId || project.id}</td>
                
                {/* Project Name */}
                <td className="px-4 py-3 font-medium">{project.name}</td>
                
                {/* Location */}
                <td className="px-4 py-3">
                  {project.location ? (
                    <span className="inline-block px-2 py-0.5 rounded-full font-medium text-xs bg-proscape/10 text-proscape">
                      {project.location}
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 rounded-full font-medium text-xs bg-gray-200 text-gray-500">
                      Not Configured
                    </span>
                  )}
                </td>
                
                {/* Start Date */}
                <td className="px-4 py-3">{formatDate(project.startDate)}</td>
                
                {/* End Date */}
                <td className="px-4 py-3">{formatDate(project.endDate)}</td>
                
                {/* Status */}
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full font-medium text-xs ${project.status === "Active"
                      ? "bg-proscape/10 text-proscape"
                      : "bg-gray-200 text-gray-500"
                    }`}>
                    {project.status}
                  </span>
                </td>
                
                {/* Actions */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label="View Details"
                            onClick={() => onView(project)}
                            className="hover:bg-proscape/10 text-proscape"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">View Details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label="Assign Location"
                            onClick={() => onAssignLocation(project)}
                            className="hover:bg-proscape/10 text-proscape"
                          >
                            <MapPin className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Assign Location</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-8 text-gray-400">No projects found</td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}
