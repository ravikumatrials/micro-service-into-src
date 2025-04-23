
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, CalendarIcon, Search, Building, MapPin, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CheckInTab from "@/components/attendance/CheckInTab";
import CheckOutTab from "@/components/attendance/CheckOutTab";
import ExceptionTab from "@/components/attendance/ExceptionTab";

const Attendance = () => {
  const [tab, setTab] = useState("checkin");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

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
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-gray-800">Attendance</h1>
        <Button variant="default" className="bg-proscape hover:bg-proscape-dark text-white px-6 py-6 rounded-2xl text-lg font-semibold transition-colors flex items-center shadow-lg animate-fade-in h-auto">
          <Upload className="h-5 w-5 mr-2" />
          Sync Offline Data
        </Button>
      </div>

      <Card className="p-0 overflow-hidden shadow-2xl border-0">
        {/* Filter controls */}
        <div className="bg-gray-50 p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal h-12">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search employee"
                className="pl-9 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Project Filter */}
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="h-12">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Select project" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Projects</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id.toString()}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="h-12">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Select location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id.toString()}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="h-12">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Select status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="checkedin">Checked In</SelectItem>
                <SelectItem value="notcheckedin">Not Checked In</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="checkin" className="w-full" onValueChange={setTab}>
          <div className="flex justify-center px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-proscape/10 to-proscape/5">
            <TabsList className="grid w-[600px] rounded-xl grid-cols-3 mx-auto bg-white/90 p-3 shadow-lg">
              <TabsTrigger value="checkin" className="text-xl py-5 rounded-xl data-[state=active]:bg-proscape data-[state=active]:text-white">
                Check In
              </TabsTrigger>
              <TabsTrigger value="checkout" className="text-xl py-5 rounded-xl data-[state=active]:bg-proscape data-[state=active]:text-white">
                Check Out
              </TabsTrigger>
              <TabsTrigger value="exception" className="text-xl py-5 rounded-xl data-[state=active]:bg-proscape data-[state=active]:text-white">
                Exceptions
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="checkin" className="p-6 lg:p-8">
            <CheckInTab 
              searchQuery={searchQuery} 
              selectedProject={selectedProject} 
              selectedLocation={selectedLocation} 
              selectedStatus={selectedStatus} 
              projects={projects}
              locations={locations}
            />
          </TabsContent>

          <TabsContent value="checkout" className="p-6 lg:p-8">
            <CheckOutTab 
              searchQuery={searchQuery} 
              selectedProject={selectedProject} 
              selectedLocation={selectedLocation}
              projects={projects}
              locations={locations}
            />
          </TabsContent>

          <TabsContent value="exception" className="p-6 lg:p-8">
            <ExceptionTab 
              searchQuery={searchQuery} 
              selectedProject={selectedProject} 
              selectedLocation={selectedLocation}
              projects={projects}
              locations={locations}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Attendance;
