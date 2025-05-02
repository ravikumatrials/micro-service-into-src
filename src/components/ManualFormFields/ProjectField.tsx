
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectFieldProps {
  projects: { id: number; name: string }[];
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  id?: string;
}

const ProjectField = ({ 
  projects, 
  value, 
  onChange, 
  error = false, 
  errorMessage = "", 
  id 
}: ProjectFieldProps) => (
  <div className="w-full space-y-2">
    <Label htmlFor={id || "project-select"} className="block text-xl font-medium text-gray-700">
      Project
    </Label>
    <Select
      value={value}
      onValueChange={(value) => onChange && onChange(value)}
    >
      <SelectTrigger 
        id={id || "project-select"} 
        className={`w-full px-5 py-4 text-xl h-auto ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-proscape"
        }`}
      >
        <SelectValue placeholder="Select project" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="no-selection">Select project</SelectItem>
        {projects.map((project) => (
          <SelectItem key={project.id} value={project.id.toString()}>
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {error && errorMessage && (
      <p className="text-sm text-red-500">{errorMessage}</p>
    )}
  </div>
);

export default ProjectField;
