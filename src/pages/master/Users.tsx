
import { useState, useMemo } from 'react';
import { Eye, Search, Building, User, Briefcase, ActivitySquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Updated mock data to include roles
const USERS = [
  { 
    employeeId: "EMP001", 
    name: "John Smith",
    entity: "Tanseeq Investment",
    category: "Carpenter",
    classification: "Laborer",
    status: "Active",
    role: "Supervisor", 
    assignedBy: "Admin User", 
    assignmentDate: "2025-03-15" 
  },
  { 
    employeeId: "EMP003", 
    name: "Emily Davis", 
    entity: "Tanseeq Investment LLC",
    category: "Manager",
    classification: "Staff",
    status: "Active",
    role: "Admin", 
    assignedBy: "Admin User", 
    assignmentDate: "2025-02-20" 
  },
  { 
    employeeId: "EMP005", 
    name: "Michael Brown", 
    entity: "Al Maha Projects",
    category: "Plumber",
    classification: "Laborer",
    status: "Inactive",
    role: "Clerk", 
    assignedBy: "Jane Doe", 
    assignmentDate: "2025-01-10" 
  },
  { 
    employeeId: "EMP007", 
    name: "David Lee", 
    entity: "Gulf Builders International",
    category: "Electrician",
    classification: "Laborer",
    status: "Active",
    role: "Supervisor", 
    assignedBy: "Admin User", 
    assignmentDate: "2025-04-05" 
  },
];

// Extract unique values for filter dropdowns
const getUniqueValues = (field: string) => {
  const values = USERS.map((user) => user[field as keyof typeof user]);
  return [...new Set(values)];
};

const ENTITIES = getUniqueValues('entity');
const CATEGORIES = getUniqueValues('category');
const CLASSIFICATIONS = getUniqueValues('classification');
const STATUSES = getUniqueValues('status');
const ROLES = getUniqueValues('role');

const Users = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof USERS[0] | null>(null);
  
  // Filter state
  const [employeeIdFilter, setEmployeeIdFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [entityFilter, setEntityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [classificationFilter, setClassificationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  
  // Filtered users
  const filteredUsers = useMemo(() => {
    return USERS.filter((user) => {
      // Apply all filters
      const matchesEmployeeId = user.employeeId.toLowerCase().includes(employeeIdFilter.toLowerCase());
      const matchesName = user.name.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesEntity = entityFilter === "all" || user.entity === entityFilter;
      const matchesCategory = categoryFilter === "all" || user.category === categoryFilter;
      const matchesClassification = classificationFilter === "all" || user.classification === classificationFilter;
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      
      return (
        matchesEmployeeId &&
        matchesName &&
        matchesEntity &&
        matchesCategory &&
        matchesClassification &&
        matchesStatus &&
        matchesRole
      );
    });
  }, [
    employeeIdFilter,
    nameFilter,
    entityFilter,
    categoryFilter,
    classificationFilter,
    statusFilter,
    roleFilter,
  ]);

  // Clear all filters
  const handleClearFilters = () => {
    setEmployeeIdFilter("");
    setNameFilter("");
    setEntityFilter("all");
    setCategoryFilter("all");
    setClassificationFilter("all");
    setStatusFilter("all");
    setRoleFilter("all");
  };

  // Open view modal
  const handleOpenViewModal = (user: typeof USERS[0]) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-5 px-1 pt-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-5">User Management</h1>
        
        {/* Search and Filter Section */}
        <Card className="p-5 mb-6">
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Employee ID Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search by Employee ID"
                    value={employeeIdFilter}
                    onChange={(e) => setEmployeeIdFilter(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* Name Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search by Name"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* Entity Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entity
                </label>
                <div className="relative">
                  <Select value={entityFilter} onValueChange={setEntityFilter}>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-gray-400 mr-2" />
                        <SelectValue placeholder="All Entities" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Entities</SelectItem>
                      {ENTITIES.map((entity) => (
                        <SelectItem key={entity} value={entity}>
                          {entity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <div className="relative">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                        <SelectValue placeholder="All Categories" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Classification Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Classification
                </label>
                <div className="relative">
                  <Select value={classificationFilter} onValueChange={setClassificationFilter}>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <SelectValue placeholder="All Classifications" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classifications</SelectItem>
                      {CLASSIFICATIONS.map((classification) => (
                        <SelectItem key={classification} value={classification}>
                          {classification}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="relative">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center">
                        <ActivitySquare className="h-4 w-4 text-gray-400 mr-2" />
                        <SelectValue placeholder="All Statuses" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Role Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <div className="relative">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <SelectValue placeholder="All Roles" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      {ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={handleClearFilters}
              >
                Clear All
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Apply Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Users Table */}
        <Card className="p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Classification</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.employeeId}>
                    <TableCell className="font-medium">{user.employeeId}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={user.entity}>
                      {user.entity}
                    </TableCell>
                    <TableCell>{user.category}</TableCell>
                    <TableCell>{user.classification}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          user.status === "Active" 
                            ? "bg-green-100 text-green-800 hover:bg-green-200" 
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                onClick={() => handleOpenViewModal(user)}
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View Details</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                    No users found with the specified criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        {/* View Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Employee Details</DialogTitle>
              <DialogDescription>
                View details for {selectedUser?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <p className="text-sm font-medium">Employee ID:</p>
              <p className="text-sm">{selectedUser?.employeeId}</p>
              
              <p className="text-sm font-medium">Name:</p>
              <p className="text-sm">{selectedUser?.name}</p>
              
              <p className="text-sm font-medium">Role:</p>
              <p className="text-sm">
                <Badge className="bg-blue-100 text-blue-800">
                  {selectedUser?.role}
                </Badge>
              </p>
              
              <p className="text-sm font-medium">Entity:</p>
              <p className="text-sm">{selectedUser?.entity}</p>
              
              <p className="text-sm font-medium">Category:</p>
              <p className="text-sm">{selectedUser?.category}</p>
              
              <p className="text-sm font-medium">Classification:</p>
              <p className="text-sm">{selectedUser?.classification}</p>
              
              <p className="text-sm font-medium">Status:</p>
              <p className="text-sm">
                <Badge 
                  className={
                    selectedUser?.status === "Active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }
                >
                  {selectedUser?.status}
                </Badge>
              </p>
              
              <p className="text-sm font-medium">Assigned By:</p>
              <p className="text-sm">{selectedUser?.assignedBy}</p>
              
              <p className="text-sm font-medium">Assignment Date:</p>
              <p className="text-sm">
                {selectedUser?.assignmentDate && format(new Date(selectedUser.assignmentDate), "MMM dd, yyyy")}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Users;
