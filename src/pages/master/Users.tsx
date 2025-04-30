
import { useState } from 'react';
import { CalendarIcon, FileText, User, UserCog } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

// Mock data for users with role assignments
const USERS = [
  { 
    employeeId: "EMP001", 
    name: "John Smith", 
    role: "Supervisor", 
    assignedBy: "Admin User", 
    assignmentDate: "2025-03-15" 
  },
  { 
    employeeId: "EMP003", 
    name: "Emily Davis", 
    role: "Manager", 
    assignedBy: "Admin User", 
    assignmentDate: "2025-02-20" 
  },
  { 
    employeeId: "EMP005", 
    name: "Michael Brown", 
    role: "Clerk", 
    assignedBy: "Jane Doe", 
    assignmentDate: "2025-01-10" 
  },
  { 
    employeeId: "EMP007", 
    name: "David Lee", 
    role: "Supervisor", 
    assignedBy: "Admin User", 
    assignmentDate: "2025-04-05" 
  },
];

// Mock roles for dropdown
const ROLES = ["Supervisor", "Manager", "Clerk", "Admin"];

const Users = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof USERS[0] | null>(null);
  const [newRole, setNewRole] = useState("");

  // Filter users based on search query
  const filteredUsers = USERS.filter((user) => {
    return (
      user.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Open change role modal
  const handleOpenChangeRoleModal = (user: typeof USERS[0]) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsChangeRoleModalOpen(true);
  };

  // Handle role change
  const handleChangeRole = () => {
    if (selectedUser && newRole) {
      // In a real app, this would update the role in the database
      toast({
        title: "Role Updated",
        description: `${selectedUser.name}'s role has been updated to ${newRole}.`,
      });
      setIsChangeRoleModalOpen(false);
      setSelectedUser(null);
    }
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
                placeholder="Search by ID, name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
              <FileText className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </Card>

        {/* Users Table */}
        <Card className="p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Assigned By</TableHead>
                <TableHead>Assignment Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.employeeId}>
                    <TableCell className="font-medium">{user.employeeId}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <span className="bg-proscape-lighter text-proscape px-2 py-1 rounded-full text-xs">
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>{user.assignedBy}</TableCell>
                    <TableCell>{format(new Date(user.assignmentDate), "MMM dd, yyyy")}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenChangeRoleModal(user)}
                        className="flex items-center gap-1"
                      >
                        <UserCog className="h-4 w-4" /> Change Role
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    No users found with the specified criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Change Role Modal */}
        <Dialog open={isChangeRoleModalOpen} onOpenChange={setIsChangeRoleModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Change User Role</DialogTitle>
              <DialogDescription>
                Update the role for {selectedUser?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-sm font-medium">Employee ID:</p>
                <p className="col-span-3">{selectedUser?.employeeId}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-sm font-medium">Name:</p>
                <p className="col-span-3">{selectedUser?.name}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-sm font-medium">Current Role:</p>
                <p className="col-span-3">{selectedUser?.role}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-sm font-medium">New Role:</p>
                <div className="col-span-3">
                  <Select value={newRole} onValueChange={setNewRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
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
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsChangeRoleModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-proscape hover:bg-proscape-dark text-white"
                onClick={handleChangeRole}
              >
                Update Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Users;
