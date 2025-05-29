
import { useState } from "react";
import { AttendanceTypeForm } from "@/components/master/AttendanceTypeForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
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

interface AttendanceType {
  id: string;
  attendanceTypeName: string;
}

// Mock data storage - in a real app, this would be connected to a backend
const mockAttendanceTypes: AttendanceType[] = [
  { id: "1", attendanceTypeName: "Present" },
  { id: "2", attendanceTypeName: "Sick Leave" },
  { id: "3", attendanceTypeName: "Casual Leave" },
  { id: "4", attendanceTypeName: "Present (Visa/ID)" },
];

export default function AttendanceType() {
  const [attendanceTypes, setAttendanceTypes] = useState<AttendanceType[]>(mockAttendanceTypes);
  const [editingType, setEditingType] = useState<AttendanceType | null>(null);

  const handleAdd = (data: Omit<AttendanceType, 'id'>) => {
    const newAttendanceType: AttendanceType = {
      id: Date.now().toString(),
      ...data
    };
    setAttendanceTypes([...attendanceTypes, newAttendanceType]);
  };

  const handleEdit = (data: Omit<AttendanceType, 'id'>) => {
    if (!editingType) return;
    
    setAttendanceTypes(attendanceTypes.map(type => 
      type.id === editingType.id 
        ? { ...type, ...data }
        : type
    ));
    setEditingType(null);
  };

  const handleDelete = (id: string) => {
    setAttendanceTypes(attendanceTypes.filter(type => type.id !== id));
    toast.success("Attendance Type deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendance Type</h1>
        <p className="text-gray-600">Manage attendance type records</p>
      </div>

      {/* Form Section */}
      <AttendanceTypeForm
        onSubmit={editingType ? handleEdit : handleAdd}
        initialData={editingType || undefined}
        mode={editingType ? 'edit' : 'add'}
        onCancel={editingType ? () => setEditingType(null) : undefined}
      />

      {/* Data Table Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Attendance Types</h2>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attendance Type Name</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceTypes.map((type) => (
                <TableRow key={type.id}>
                  <TableCell className="font-medium">
                    {type.attendanceTypeName}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingType(type)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Attendance Type</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{type.attendanceTypeName}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(type.id)}>
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
        </div>
      </div>
    </div>
  );
}
