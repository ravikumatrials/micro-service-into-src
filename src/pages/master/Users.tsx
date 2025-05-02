
import { useState } from 'react';
import { Eye } from "lucide-react";
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

// Updated mock data to include roles
const USERS = [
  { 
    employeeId: "EMP001", 
    name: "John Smith",
    entity: "Tanseeq Investment",
    category: "Carpenter",
    classification: "Laborer",
    status: "Active",
    roles: ["Supervisor", "Report Admin"], 
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
    roles: ["Manager", "Admin"], 
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
    roles: ["Clerk"], 
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
    roles: ["Supervisor"], 
    assignedBy: "Admin User", 
    assignmentDate: "2025-04-05" 
  },
];

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof USERS[0] | null>(null);

  // Filter users based on search query
  const filteredUsers = USERS.filter((user) => {
    return (
      user.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Open view modal
  const handleOpenViewModal = (user: typeof USERS[0]) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  // Format roles for display
  const formatRoles = (roles: string[]) => {
    if (!roles || roles.length === 0) return "-";
    if (roles.length === 1) return roles[0];
    
    // For multiple roles, display first one + count
    return `${roles[0]} +${roles.length - 1}`;
  };

  return (
    <div className="space-y-5 px-1 pt-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-5">User Management</h1>
        
        {/* Search and Filter Section */}
        <Card className="p-5 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <Input
                placeholder="Search by ID, name, entity or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
              <Eye className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                <TableHead>Roles</TableHead>
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
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">
                            <span className="max-w-[150px] truncate inline-block">
                              {formatRoles(user.roles)}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{user.roles.join(", ")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
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
              
              <p className="text-sm font-medium">Roles:</p>
              <p className="text-sm">{selectedUser?.roles?.join(", ") || "-"}</p>
              
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
