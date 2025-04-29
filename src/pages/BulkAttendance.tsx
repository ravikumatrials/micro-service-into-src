
import { useState } from 'react';
import { Calendar, CheckCircle, CheckCheck, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock data for employees
const MOCK_EMPLOYEES = [
  { id: "EMP001", name: "John Smith", entity: "Acme Construction", project: "Main Building Construction" },
  { id: "EMP002", name: "Sarah Johnson", entity: "Acme Construction", project: "Main Building Construction" },
  { id: "EMP003", name: "Emily Davis", entity: "Skyline Builders", project: "Bridge Expansion" },
  { id: "EMP004", name: "Robert Williams", entity: "Skyline Builders", project: "Bridge Expansion" },
  { id: "EMP005", name: "Michael Brown", entity: "Acme Construction", project: "Warehouse Project" },
  { id: "EMP006", name: "Lisa Wilson", entity: "Metro Developers", project: "Main Building Construction" },
  { id: "EMP007", name: "David Lee", entity: "Metro Developers", project: "Warehouse Project" },
  { id: "EMP008", name: "Jennifer Taylor", entity: "Skyline Builders", project: "Bridge Expansion" },
  { id: "EMP009", name: "James Anderson", entity: "Acme Construction", project: "Main Building Construction" },
  { id: "EMP010", name: "Maria Garcia", entity: "Metro Developers", project: "Warehouse Project" },
];

// Mock data for filter options
const PROJECTS = ["Main Building Construction", "Bridge Expansion", "Warehouse Project"];
const LOCATIONS = ["Downtown Site", "Bridge Zone A", "East Industrial"];
const ENTITIES = ["Acme Construction", "Skyline Builders", "Metro Developers"];
const ROLES = ["Laborer", "Supervisor", "Contractor"];

const BulkAttendance = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [project, setProject] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // State for selected employees and modal
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendanceType, setAttendanceType] = useState<"check-in" | "check-out">("check-in");
  const [attendanceTime, setAttendanceTime] = useState(format(new Date(), "HH:mm"));
  const [reason, setReason] = useState("");

  // Filter employees based on filters
  const filteredEmployees = MOCK_EMPLOYEES.filter((employee) => {
    if (project && employee.project !== project) return false;
    if (searchQuery && !employee.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !employee.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map(e => e.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle checkbox change
  const handleCheckboxChange = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  // Handle mark attendance
  const handleMarkAttendance = () => {
    setIsModalOpen(true);
  };

  // Handle confirmation
  const handleConfirm = () => {
    toast({
      title: "Success!",
      description: `Attendance marked for ${selectedEmployees.length} employees on ${format(date || new Date(), "MMM dd, yyyy")}.`,
    });
    setIsModalOpen(false);
    setSelectedEmployees([]);
    setSelectAll(false);
  };

  return (
    <div className="space-y-5 px-1 pt-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-5">Bulk Attendance</h1>
        
        {/* Filter Section */}
        <Card className="p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Date Filter */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between font-normal"
                  >
                    {date ? format(date, "PPP") : "Select date"}
                    <Calendar className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Project Filter */}
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Select value={project} onValueChange={setProject}>
                <SelectTrigger>
                  <SelectValue placeholder="All Projects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Projects</SelectItem>
                  {PROJECTS.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  {LOCATIONS.map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Role Filter */}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Roles</SelectItem>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search and Action Buttons */}
          <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name or ID..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              className="bg-proscape hover:bg-proscape-dark text-white"
              onClick={handleMarkAttendance}
              disabled={selectedEmployees.length === 0}
            >
              <CheckCircle className="mr-2 h-4 w-4" /> Mark Attendance
            </Button>
          </div>
        </Card>

        {/* Employees Table */}
        <Card className="p-0 overflow-x-auto shadow-sm">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 w-16">
                  <Checkbox 
                    checked={selectAll} 
                    onCheckedChange={handleSelectAll} 
                    aria-label="Select all employees"
                  />
                </th>
                <th className="px-4 py-3">Employee ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Entity</th>
                <th className="px-4 py-3">Assigned Project</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Checkbox 
                        checked={selectedEmployees.includes(employee.id)}
                        onCheckedChange={() => handleCheckboxChange(employee.id)}
                        aria-label={`Select ${employee.name}`}
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{employee.id}</td>
                    <td className="px-4 py-3">{employee.name}</td>
                    <td className="px-4 py-3">{employee.entity}</td>
                    <td className="px-4 py-3">{employee.project}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">
                    No employees found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>

        {/* Summary Footer */}
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600 px-2">
          <p>Total: {filteredEmployees.length} employees</p>
          <p>Selected: {selectedEmployees.length} employees</p>
        </div>
      </div>

      {/* Mark Attendance Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mark Bulk Attendance</DialogTitle>
            <DialogDescription>
              You're marking attendance for {selectedEmployees.length} employees on {format(date || new Date(), "MMM dd, yyyy")}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-3">
            <div className="space-y-2">
              <Label htmlFor="attendance-type">Attendance Type</Label>
              <Select 
                value={attendanceType} 
                onValueChange={(value) => setAttendanceType(value as "check-in" | "check-out")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="check-in">Check-In</SelectItem>
                  <SelectItem value="check-out">Check-Out</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input 
                id="time"
                type="time" 
                value={attendanceTime}
                onChange={(e) => setAttendanceTime(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason/Comment</Label>
              <Input 
                id="reason"
                placeholder="Reason for manual entry..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <p className="text-xs text-gray-500">Required for manual entry</p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-proscape hover:bg-proscape-dark text-white"
              onClick={handleConfirm}
              disabled={!reason.trim()}
            >
              <CheckCheck className="mr-2 h-4 w-4" /> Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BulkAttendance;
