
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Briefcase, Calendar, Edit, Eye, MapPin, Plus, Search, Trash, X } from "lucide-react";

// Mock data
const initialProjects = [
  { 
    id: 1, 
    name: "Main Building Construction", 
    description: "Construction of the main 30-story building in downtown area", 
    location: "Main Construction Site",
    startDate: "01/15/2023",
    endDate: "12/31/2025",
    manager: "John Smith",
    budget: "$25,000,000",
    status: "In Progress"
  },
  { 
    id: 2, 
    name: "Bridge Expansion Project", 
    description: "Expanding the north bridge to accommodate increased traffic flow", 
    location: "Bridge Expansion Location",
    startDate: "05/20/2023",
    endDate: "08/15/2024",
    manager: "Sarah Johnson",
    budget: "$12,500,000",
    status: "In Progress"
  },
  { 
    id: 3, 
    name: "Highway Renovation", 
    description: "Renovation and expansion of the main highway", 
    location: "Highway Renovation Site",
    startDate: "09/10/2023",
    endDate: "06/30/2024",
    manager: "Robert Williams",
    budget: "$18,750,000",
    status: "In Progress"
  },
  { 
    id: 4, 
    name: "South Tower Construction", 
    description: "Building the new south tower for commercial use", 
    location: "South Tower Project",
    startDate: "11/15/2023",
    endDate: "03/31/2026",
    manager: "Emily Davis",
    budget: "$30,000,000",
    status: "Planning"
  },
];

// Mock locations for dropdown
const locations = [
  { id: 1, name: "Main Construction Site" },
  { id: 2, name: "Bridge Expansion Location" },
  { id: 3, name: "Highway Renovation Site" },
  { id: 4, name: "South Tower Project" }
];

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    manager: "",
    budget: "",
    status: "Planning"
  });

  // Filter projects based on search term and status filter
  const filteredProjects = projects.filter((project) => {
    const searchMatch = 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const statusMatch = 
      statusFilter === "all" || 
      project.status.toLowerCase().replace(" ", "-") === statusFilter.toLowerCase();
    
    return searchMatch && statusMatch;
  });

  const handleCreateProject = () => {
    // Generate a new ID that's one higher than the current max ID
    const maxId = Math.max(...projects.map(p => p.id));
    const newId = maxId + 1;
    
    const projectToAdd = {
      id: newId,
      name: newProject.name,
      description: newProject.description,
      location: newProject.location,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      manager: newProject.manager,
      budget: newProject.budget,
      status: newProject.status
    };
    
    setProjects([...projects, projectToAdd]);
    setIsCreateModalOpen(false);
    
    // Reset form
    setNewProject({
      name: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
      manager: "",
      budget: "",
      status: "Planning"
    });
  };

  const handleProjectView = (project) => {
    setSelectedProject(project);
    setIsViewModalOpen(true);
  };

  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const unformatDate = (dateString) => {
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-auto md:flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
              placeholder="Search projects"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center w-full md:w-auto">
            <span className="text-sm text-gray-600 mr-2">Status:</span>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-proscape w-full md:w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="on-hold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3">Project Name</th>
                <th scope="col" className="px-4 py-3">Location</th>
                <th scope="col" className="px-4 py-3">Start Date</th>
                <th scope="col" className="px-4 py-3">End Date</th>
                <th scope="col" className="px-4 py-3">Manager</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map(project => (
                  <tr key={project.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{project.name}</td>
                    <td className="px-4 py-3">{project.location}</td>
                    <td className="px-4 py-3">{project.startDate}</td>
                    <td className="px-4 py-3">{project.endDate}</td>
                    <td className="px-4 py-3">{project.manager}</td>
                    <td className="px-4 py-3">
                      <span 
                        className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                          project.status === "In Progress" 
                            ? "bg-blue-100 text-blue-800" 
                            : project.status === "Planning"
                            ? "bg-purple-100 text-purple-800"
                            : project.status === "On Hold"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleProjectView(project)}
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
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                    No projects found matching the search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredProjects.length}</span> of{" "}
            <span className="font-medium">{projects.length}</span> projects
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </Card>

      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New Project</h2>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                  placeholder="Enter project name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                  placeholder="Enter project description"
                  rows={3}
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                    value={newProject.location}
                    onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                    required
                  >
                    <option value="">Select Location</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.name}>{location.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Manager
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                    placeholder="Enter project manager"
                    value={newProject.manager}
                    onChange={(e) => setNewProject({...newProject, manager: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({...newProject, startDate: unformatDate(e.target.value)})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                    value={newProject.endDate}
                    onChange={(e) => setNewProject({...newProject, endDate: unformatDate(e.target.value)})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                    placeholder="Enter project budget"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                    value={newProject.status}
                    onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 bg-proscape hover:bg-proscape-dark text-white rounded-md text-sm font-medium transition-colors"
                disabled={!newProject.name || !newProject.location || !newProject.startDate || !newProject.endDate}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Project Modal */}
      {isViewModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Project Details</h2>
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedProject.name}</h3>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedProject.location}
                  </div>
                </div>
                <div className="mt-3 md:mt-0">
                  <span 
                    className={`inline-flex items-center text-sm font-medium px-2.5 py-1 rounded-full ${
                      selectedProject.status === "In Progress" 
                        ? "bg-blue-100 text-blue-800" 
                        : selectedProject.status === "Planning"
                        ? "bg-purple-100 text-purple-800"
                        : selectedProject.status === "On Hold"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {selectedProject.status}
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                <p className="text-gray-900">{selectedProject.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Project Manager</h4>
                  <p className="text-gray-900">{selectedProject.manager}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Budget</h4>
                  <p className="text-gray-900">{selectedProject.budget}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Duration</h4>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    <p className="text-gray-900">
                      {selectedProject.startDate} - {selectedProject.endDate}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-3">Assigned Employees</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="border rounded-md p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">John Smith</p>
                      <p className="text-xs text-gray-500">Supervisor</p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Active
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-xs text-gray-500">Engineer</p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Active
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Robert Williams</p>
                      <p className="text-xs text-gray-500">Labour</p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Active
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Emily Davis</p>
                      <p className="text-xs text-gray-500">Labour</p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Active
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 border rounded-md p-3 flex justify-center items-center">
                    <button className="text-proscape hover:text-proscape-dark text-sm font-medium">
                      View All Employees
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-proscape hover:bg-proscape-dark text-white rounded-md text-sm font-medium transition-colors"
              >
                Edit Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
