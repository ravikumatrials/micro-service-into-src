
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Eye, Edit, Trash, MapPin, Calendar, X, Upload } from "lucide-react";
import ImportProjectsModal from "./ImportProjectsModal";
import ProjectCard from "./ProjectCard";

// Dummy data for initial projects
const initialProjects = [
  {
    id: 1,
    name: "Main Building Construction",
    location: "Downtown Site",
    employees: ["John Smith", "Sarah Johnson"],
    status: "In Progress"
  },
  {
    id: 2,
    name: "Bridge Expansion",
    location: "Bridge Zone A",
    employees: ["Emily Davis"],
    status: "Planning"
  },
  {
    id: 3,
    name: "Warehouse Project",
    location: "East Industrial",
    employees: ["Robert Williams"],
    status: "Completed"
  }
];

// Dummy data for simulation on import
const dummyImportedProjects = [
  {
    id: 101,
    name: "Highway Renovation",
    location: "North Express",
    employees: ["Brian Carson", "Amy Howard"],
    status: "In Progress"
  },
  {
    id: 102,
    name: "School Campus",
    location: "Greenfield",
    employees: ["Lisa Moore"],
    status: "On Hold"
  },
  {
    id: 103,
    name: "Hospital Wing",
    location: "Central Med",
    employees: ["Jake Turner", "Wendy Black"],
    status: "Planning"
  }
];

const statusBadge = (status: string) => {
  if (status === "In Progress")
    return "bg-blue-100 text-blue-800";
  if (status === "Planning")
    return "bg-purple-100 text-purple-800";
  if (status === "On Hold")
    return "bg-amber-100 text-amber-800";
  if (status === "Completed")
    return "bg-green-100 text-green-800";
  return "bg-gray-100 text-gray-800";
};

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [isImportOpen, setIsImportOpen] = useState(false);

  // Simulate import — add dummy projects to current projects
  const handleImport = () => {
    setProjects((prev) => [
      ...prev,
      ...dummyImportedProjects.map(p => ({ ...p, id: prev.length + Math.random() }))
    ]);
    setIsImportOpen(false);
  };

  // Responsive mode: cards for mobile, table for md+
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
        <button
          className="flex items-center bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          onClick={() => setIsImportOpen(true)}
        >
          <Upload className="h-4 w-4 mr-2" />
          Import Projects
        </button>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block">
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Project Name</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Assigned Employees</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <tr key={project.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{project.name}</td>
                      <td className="px-4 py-3">{project.location}</td>
                      <td className="px-4 py-3">
                        {project.employees && project.employees.length > 0
                          ? project.employees.join(", ")
                          : <span className="text-xs text-gray-400 italic">None</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${statusBadge(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            title="View Project"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            title="Edit Project"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            title="Delete Project"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                      No projects found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* MOBILE CARD LIST */}
      <div className="block md:hidden space-y-4">
        {projects.length === 0 ? (
          <Card className="p-8 text-center text-gray-500">No projects found</Card>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>

      <ImportProjectsModal
        open={isImportOpen}
        onOpenChange={setIsImportOpen}
        onImport={handleImport}
      />
    </div>
  );
};

export default Projects;
