
import React from "react";

interface ProjectFieldProps {
  projects: { id: number; name: string }[];
}
const ProjectField = ({ projects }: ProjectFieldProps) => (
  <div>
    <label className="block text-lg font-medium text-gray-700 mb-2">Project</label>
    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-proscape text-lg">
      <option value="">Select project</option>
      {projects.map((project) => (
        <option key={project.id} value={project.id}>
          {project.name}
        </option>
      ))}
    </select>
  </div>
);
export default ProjectField;
