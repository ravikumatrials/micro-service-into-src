
import React from "react";

interface ProjectFieldProps {
  projects: { id: number; name: string }[];
}

const ProjectField = ({ projects }: ProjectFieldProps) => (
  <div className="w-full">
    <label className="block text-xl font-medium text-gray-700 mb-3">Project</label>
    <select className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-proscape text-xl shadow-sm appearance-none bg-white">
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
