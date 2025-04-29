
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Trash, MapPin } from "lucide-react";

function formatDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function ProjectCardMobile({ project, onView, onDelete, onAssignLocation }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium">{project.name}</h3>
          <p className="text-xs text-gray-500">{project.location}</p>
        </div>
        <span className={`inline-flex px-2 py-1 rounded-full text-xs ${
          project.status === "Active"
            ? "bg-proscape/10 text-proscape"
            : "bg-gray-200 text-gray-500"
        }`}>
          {project.status}
        </span>
      </div>
      
      <div className="space-y-2 mb-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Location Status:</span>
          <span>
            {project.coordinates ? (
              <span className="text-proscape font-medium">Configured</span>
            ) : (
              <span className="text-gray-500">Not Configured</span>
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Duration:</span>
          <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Team:</span>
          <span>{project.assignedEmployees?.length || 0} members</span>
        </div>
      </div>
      
      <div className="flex gap-2 justify-end pt-2 border-t border-gray-100">
        <Button size="sm" variant="ghost" className="text-proscape" onClick={() => onView(project)}>
          <Eye className="h-4 w-4 mr-1" /> View
        </Button>
        <Button size="sm" variant="ghost" className="text-proscape" onClick={() => onAssignLocation(project)}>
          <MapPin className="h-4 w-4 mr-1" /> Location
        </Button>
        <Button size="sm" variant="ghost" className="text-red-600" onClick={() => onDelete(project)}>
          <Trash className="h-4 w-4 mr-1" /> Delete
        </Button>
      </div>
    </Card>
  );
}
