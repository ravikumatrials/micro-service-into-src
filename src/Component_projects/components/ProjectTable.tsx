
import { Eye, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";

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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4">Entity</th>
            <th className="text-left p-4">Project ID</th>
            <th className="text-left p-4">Project Name</th>
            <th className="text-left p-4">Location</th>
            <th className="text-left p-4">Start Date</th>
            <th className="text-left p-4">End Date</th>
            <th className="text-left p-4">Status</th>
            <th className="text-right p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length ? (
            projects.map((project) => (
              <tr key={project.id} className="border-b">
                <td className="p-4">{project.entity || "N/A"}</td>
                <td className="p-4">{project.projectId || project.id}</td>
                <td className="p-4 font-medium">{project.name}</td>
                <td className="p-4">
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
                <td className="p-4">{formatDate(project.startDate)}</td>
                <td className="p-4">{formatDate(project.endDate)}</td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-0.5 rounded-full font-medium text-xs ${
                    project.status === "Active"
                      ? "bg-proscape/10 text-proscape"
                      : "bg-gray-200 text-gray-500"
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(project)}
                      className="hover:bg-proscape/10 text-proscape"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onAssignLocation(project)}
                      className="hover:bg-proscape/10 text-proscape"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
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
    </div>
  );
}
