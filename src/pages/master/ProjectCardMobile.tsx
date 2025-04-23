
import { Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

function formatDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function ProjectCardMobile({ project, onView, onDelete }: {
  project: any;
  onView: (p: any) => void;
  onDelete: (p: any) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-base">{project.name}</span>
        <span className={`px-2 py-0.5 ml-2 rounded-full text-xs font-semibold ${project.status === "Active"
          ? "bg-proscape/10 text-proscape"
          : "bg-gray-200 text-gray-500"
        }`}>
          {project.status}
        </span>
      </div>
      <div className="mt-2 mb-1 text-xs text-gray-500">{project.location}</div>
      {/* Expand/Collapse for details */}
      <button
        className="text-proscape underline text-xs mb-2"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? "Hide Details" : "Show Details"}
      </button>
      {expanded && (
        <div className="space-y-1 mb-2">
          <div>
            <span className="font-medium text-gray-700">Start:</span>{" "}
            {formatDate(project.startDate)}
          </div>
          <div>
            <span className="font-medium text-gray-700">End:</span>{" "}
            {formatDate(project.endDate)}
          </div>
          <div>
            <span className="font-medium text-gray-700">Employees:</span>{" "}
            {project.assignedEmployees && project.assignedEmployees.length
              ? project.assignedEmployees.map((e:any) => e.name).join(", ")
              : <span className="italic text-xs text-gray-400">None</span>}
          </div>
        </div>
      )}
      <div className="flex gap-3 mt-2">
        <Button
          size="sm"
          variant="ghost"
          className="text-proscape"
          onClick={() => onView(project)}
        >
          <Eye className="h-4 w-4 mr-1" /> View
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-red-600"
          onClick={() => onDelete(project)}
        >
          <Trash className="h-4 w-4 mr-1" /> Delete
        </Button>
      </div>
    </Card>
  );
}
