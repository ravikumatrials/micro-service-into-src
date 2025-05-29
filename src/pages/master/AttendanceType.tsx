
import { useState } from "react";
import { AttendanceTypeForm } from "@/components/master/AttendanceTypeForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

type AttendanceType = {
  id: string;
  attendanceTypeName: string;
  description?: string;
  status: boolean;
  createdAt: string;
};

// Mock data for demonstration
const mockAttendanceTypes: AttendanceType[] = [
  {
    id: "1",
    attendanceTypeName: "Present (Visa/ID)",
    description: "Regular attendance marked with visa or ID verification",
    status: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    attendanceTypeName: "Sick Leave",
    description: "Used when employee is marked sick by Medical Officer",
    status: true,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    attendanceTypeName: "Annual Leave",
    description: "Approved vacation or annual leave days",
    status: true,
    createdAt: "2024-01-08",
  },
  {
    id: "4",
    attendanceTypeName: "Emergency Leave",
    description: "Unplanned leave for emergencies",
    status: false,
    createdAt: "2024-01-05",
  },
];

export default function AttendanceType() {
  const [attendanceTypes, setAttendanceTypes] = useState<AttendanceType[]>(mockAttendanceTypes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAttendanceType, setSelectedAttendanceType] = useState<AttendanceType | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredAttendanceTypes = attendanceTypes.filter(type =>
    type.attendanceTypeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (type.description && type.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAdd = (data: any) => {
    const newAttendanceType: AttendanceType = {
      id: Date.now().toString(),
      attendanceTypeName: data.attendanceTypeName,
      description: data.description,
      status: data.status,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setAttendanceTypes(prev => [newAttendanceType, ...prev]);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (data: any) => {
    if (!selectedAttendanceType) return;
    
    setAttendanceTypes(prev =>
      prev.map(type =>
        type.id === selectedAttendanceType.id
          ? {
              ...type,
              attendanceTypeName: data.attendanceTypeName,
              description: data.description,
              status: data.status,
            }
          : type
      )
    );
    setIsEditDialogOpen(false);
    setSelectedAttendanceType(null);
  };

  const handleDelete = (id: string) => {
    setAttendanceTypes(prev => prev.filter(type => type.id !== id));
    toast.success("Attendance type deleted successfully!");
  };

  const handleView = (attendanceType: AttendanceType) => {
    setSelectedAttendanceType(attendanceType);
    setIsViewDialogOpen(true);
  };

  const handleEditClick = (attendanceType: AttendanceType) => {
    setSelectedAttendanceType(attendanceType);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Type</h1>
          <p className="text-muted-foreground">
            Manage attendance types for the system
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Attendance Type</DialogTitle>
              <DialogDescription>
                Create a new attendance type for the system
              </DialogDescription>
            </DialogHeader>
            <AttendanceTypeForm onSubmit={handleAdd} mode="add" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Form Section */}
      <AttendanceTypeForm onSubmit={handleAdd} mode="add" />

      {/* Data Table Section */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Types</CardTitle>
          <CardDescription>
            View and manage all attendance types
          </CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search attendance types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attendance Type Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendanceTypes.map((attendanceType) => (
                <TableRow key={attendanceType.id}>
                  <TableCell className="font-medium">
                    {attendanceType.attendanceTypeName}
                  </TableCell>
                  <TableCell>
                    {attendanceType.description || "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={attendanceType.status ? "default" : "secondary"}>
                      {attendanceType.status ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{attendanceType.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(attendanceType)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(attendanceType)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the
                              attendance type "{attendanceType.attendanceTypeName}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(attendanceType.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredAttendanceTypes.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No attendance types found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Attendance Type</DialogTitle>
          </DialogHeader>
          {selectedAttendanceType && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Attendance Type Name</label>
                <p className="text-sm text-muted-foreground">
                  {selectedAttendanceType.attendanceTypeName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <p className="text-sm text-muted-foreground">
                  {selectedAttendanceType.description || "No description provided"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <p className="text-sm text-muted-foreground">
                  <Badge variant={selectedAttendanceType.status ? "default" : "secondary"}>
                    {selectedAttendanceType.status ? "Active" : "Inactive"}
                  </Badge>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Created Date</label>
                <p className="text-sm text-muted-foreground">
                  {selectedAttendanceType.createdAt}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Attendance Type</DialogTitle>
            <DialogDescription>
              Update attendance type information
            </DialogDescription>
          </DialogHeader>
          {selectedAttendanceType && (
            <AttendanceTypeForm
              onSubmit={handleEdit}
              initialData={selectedAttendanceType}
              mode="edit"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
