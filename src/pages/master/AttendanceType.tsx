
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { toast } from "@/hooks/use-toast";
import { AttendanceTypeForm } from "@/components/master/AttendanceTypeForm";

// Default attendance type entries
const defaultAttendanceTypes = [
  {
    id: 1,
    attendanceTypeName: "Present"
  },
  {
    id: 2,
    attendanceTypeName: "Sick Leave"
  },
  {
    id: 3,
    attendanceTypeName: "Casual Leave"
  },
  {
    id: 4,
    attendanceTypeName: "Present (Visa/ID)"
  }
];

const AttendanceType = () => {
  const isMobile = useIsMobile();
  const [attendanceTypeData, setAttendanceTypeData] = useState(defaultAttendanceTypes);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleAddNew = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    const deletedItem = attendanceTypeData.find(item => item.id === id);
    setAttendanceTypeData(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Attendance Type Deleted",
      description: `Attendance type "${deletedItem?.attendanceTypeName}" has been removed.`,
    });
  };

  const handleSave = (data: any) => {
    if (editingItem) {
      // Check for duplicate name (excluding current item)
      const isDuplicate = attendanceTypeData.some(
        item => item.attendanceTypeName.toLowerCase() === data.attendanceTypeName.toLowerCase() && item.id !== editingItem.id
      );
      
      if (isDuplicate) {
        toast({
          title: "Duplicate Attendance Type",
          description: `Attendance type "${data.attendanceTypeName}" already exists.`,
          variant: "destructive",
        });
        return;
      }

      // Update existing item
      setAttendanceTypeData(prev => 
        prev.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item)
      );
      toast({
        title: "Attendance Type Updated",
        description: `Attendance type "${data.attendanceTypeName}" has been updated.`,
      });
    } else {
      // Check for duplicate name
      const isDuplicate = attendanceTypeData.some(item => 
        item.attendanceTypeName.toLowerCase() === data.attendanceTypeName.toLowerCase()
      );
      
      if (isDuplicate) {
        toast({
          title: "Duplicate Attendance Type",
          description: `Attendance type "${data.attendanceTypeName}" already exists.`,
          variant: "destructive",
        });
        return;
      }

      // Add new item
      const newItem = { ...data, id: Math.max(...attendanceTypeData.map(r => r.id)) + 1 };
      setAttendanceTypeData(prev => [...prev, newItem]);
      toast({
        title: "Attendance Type Added",
        description: `Attendance type "${data.attendanceTypeName}" has been created.`,
      });
    }
    setIsFormOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance Type</h1>
          <p className="text-gray-600 mt-1">Manage attendance type categories for the system</p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Attendance Type
        </Button>
      </div>

      {/* Data Table Section */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Attendance Types List</h2>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {attendanceTypeData.length} types
            </Badge>
          </div>
        </div>

        {isMobile ? (
          <div className="divide-y divide-gray-200">
            {attendanceTypeData.map((type) => (
              <div key={type.id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{type.attendanceTypeName}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(type)}>
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
                            Are you sure you want to delete this attendance type? This action cannot be undone.
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attendance Type Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceTypeData.map((type) => (
                <TableRow key={type.id}>
                  <TableCell className="font-medium">{type.attendanceTypeName}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(type)}>
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
                              Are you sure you want to delete this attendance type? This action cannot be undone.
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
        )}

        {attendanceTypeData.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No attendance types found</p>
            <p className="text-sm">Click "Add Attendance Type" to get started</p>
          </div>
        )}
      </Card>

      <AttendanceTypeForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSave}
        editingItem={editingItem}
      />
    </div>
  );
};

export default AttendanceType;
