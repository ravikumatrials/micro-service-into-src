
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Search, Building, MapPin, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CheckInTab from "@/components/attendance/CheckInTab";
import CheckOutTab from "@/components/attendance/CheckOutTab";
import ExceptionTab from "@/components/attendance/ExceptionTab";

const Attendance = () => {
  const [tab, setTab] = useState("checkin");
  const currentDate = new Date();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  
  // Add new state variables for the additional filter properties
  const [selectedClassification, setSelectedClassification] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock projects
  const projects = [
    { id: 1, name: "Main Building Construction" },
    { id: 2, name: "Bridge Expansion Project" },
    { id: 3, name: "Highway Renovation" },
  ];

  // Mock locations
  const locations = [
    { id: 1, name: "Site A" },
    { id: 2, name: "Site B" },
    { id: 3, name: "Office" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
        <Button 
          variant="default" 
          size="sm" 
          className="bg-proscape hover:bg-proscape-dark text-white flex items-center text-xs"
        >
          <Upload className="mr-1 h-3 w-3" />
          Sync Data
        </Button>
      </div>

      <Card className="p-0 overflow-hidden shadow-md border-0">
        {/* Current date display - static and prominent */}
        <div className="bg-proscape/5 p-3 border-b border-gray-200 flex items-center justify-center">
          <div className="text-lg font-medium text-gray-700">
            {format(currentDate, "MMMM d, yyyy")}
          </div>
        </div>
        
        {/* Filter controls */}
        <div className="bg-gray-50 p-3 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search employee"
                className="pl-8 h-8 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Project Filter */}
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="h-8 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="h-3 w-3 text-gray-500" />
                  <SelectValue placeholder="Project" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id.toString()}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="h-8 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-gray-500" />
                  <SelectValue placeholder="Location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id.toString()}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="checkin" className="w-full" onValueChange={setTab}>
          <div className="flex justify-center px-3 py-2 border-b border-gray-200 bg-gradient-to-r from-proscape/10 to-proscape/5">
            <TabsList className="grid w-full max-w-[400px] rounded-md grid-cols-3 bg-white/90 p-1 shadow-sm">
              <TabsTrigger 
                value="checkin" 
                className="text-xs py-1 rounded-md data-[state=active]:bg-proscape data-[state=active]:text-white"
              >
                Check In
              </TabsTrigger>
              <TabsTrigger 
                value="checkout" 
                className="text-xs py-1 rounded-md data-[state=active]:bg-proscape data-[state=active]:text-white"
              >
                Check Out
              </TabsTrigger>
              <TabsTrigger 
                value="exception" 
                className="text-xs py-1 rounded-md data-[state=active]:bg-proscape data-[state=active]:text-white"
              >
                Exceptions
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="checkin" className="p-4">
            <CheckInTab 
              searchQuery={searchQuery} 
              selectedProject={selectedProject} 
              selectedLocation={selectedLocation} 
              selectedStatus={selectedStatus}
              projects={projects}
              locations={locations}
              selectedClassification={selectedClassification}
              selectedCategory={selectedCategory}
            />
          </TabsContent>

          <TabsContent value="checkout" className="p-4">
            <CheckOutTab 
              searchQuery={searchQuery} 
              selectedProject={selectedProject} 
              selectedLocation={selectedLocation}
              projects={projects}
              locations={locations}
              selectedClassification={selectedClassification}
              selectedCategory={selectedCategory}
              selectedStatus={selectedStatus}
            />
          </TabsContent>

          <TabsContent value="exception" className="p-4">
            <ExceptionTab 
              searchQuery={searchQuery} 
              selectedProject={selectedProject} 
              selectedLocation={selectedLocation}
              projects={projects}
              locations={locations}
              selectedClassification={selectedClassification}
              selectedCategory={selectedCategory}
              selectedStatus={selectedStatus}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Attendance;
