
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
import { AttendanceRoleLogicForm } from "@/components/master/AttendanceRoleLogicForm";
import { Switch } from "@/components/ui/switch";

// Mock data for attendance role logic configurations
const mockRoleLogicData = [
  {
    id: 1,
    roleName: "Medical Officer",
    attendanceType: "Mark Sick Leave",
    defaultStatus: "Sick Leave",
    requireComment: true,
    autoProjectAssign: false,
  },
  {
    id: 2,
    roleName: "Camp Boss",
    attendanceType: "Mark Casual Leave",
    defaultStatus: "Casual Leave",
    requireComment: true,
    autoProjectAssign: false,
  },
  {
    id: 3,
    roleName: "United Emirates Officer",
    attendanceType: "ID/Visa Verification",
    defaultStatus: "Present",
    requireComment: false,
    autoProjectAssign: true,
  },
  {
    id: 4,
    roleName: "Supervisor",
    attendanceType: "Manual Attendance",
    defaultStatus: "Present",
    requireComment: false,
    autoProjectAssign: true,
  },
];

const statusOptions = ["Present", "Sick Leave", "Casual Leave", "Absent", "Exception"];

const AttendanceRoleLogic = () => {
  const isMobile = useIsMobile();
  const [roleLogicData, setRoleLogicData] = useState(mockRoleLogicData);
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
    setRoleLogicData(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Configuration Deleted",
      description: "Attendance role logic configuration has been removed.",
    });
  };

  const handleSave = (data: any) => {
    if (editingItem) {
      // Update existing item
      setRoleLogicData(prev => 
        prev.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item)
      );
      toast({
        title: "Configuration Updated",
        description: "Attendance role logic has been updated successfully.",
      });
    } else {
      // Add new item
      const newItem = { ...data, id: Math.max(...roleLogicData.map(r => r.id)) + 1 };
      setRoleLogicData(prev => [...prev, newItem]);
      toast({
        title: "Configuration Added",
        description: "New attendance role logic has been added successfully.",
      });
    }
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800 border-green-200";
      case "Sick Leave":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Casual Leave":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Absent":
        return "bg-red-100 text-red-800 border-red-200";
      case "Exception":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance Role Logic</h1>
          <p className="text-gray-600 mt-1">Configure role-specific attendance behavior and defaults</p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Configuration
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Role Configurations</h2>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {roleLogicData.length} configurations
            </Badge>
          </div>
        </div>

        {isMobile ? (
          <div className="divide-y divide-gray-200">
            {roleLogicData.map((config) => (
              <div key={config.id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{config.roleName}</h3>
                    <p className="text-sm text-gray-500">{config.attendanceType}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(config)}>
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
                          <AlertDialogTitle>Delete Configuration</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this attendance role logic configuration? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(config.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Default Status:</span>
                    <Badge className={`ml-2 ${getStatusBadgeColor(config.defaultStatus)}`}>
                      {config.defaultStatus}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Require Comment:</span>
                    <span className="ml-2">{config.requireComment ? "Yes" : "No"}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Auto Project Assign:</span>
                    <span className="ml-2">{config.autoProjectAssign ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Attendance Type</TableHead>
                <TableHead>Default Status</TableHead>
                <TableHead>Require Comment</TableHead>
                <TableHead>Auto Project Assign</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roleLogicData.map((config) => (
                <TableRow key={config.id}>
                  <TableCell className="font-medium">{config.roleName}</TableCell>
                  <TableCell>{config.attendanceType}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(config.defaultStatus)}>
                      {config.defaultStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch checked={config.requireComment} disabled />
                  </TableCell>
                  <TableCell>
                    <Switch checked={config.autoProjectAssign} disabled />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(config)}>
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
                            <AlertDialogTitle>Delete Configuration</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this attendance role logic configuration? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(config.id)}>
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

        {roleLogicData.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No attendance role logic configurations found</p>
            <p className="text-sm">Click "Add New Configuration" to get started</p>
          </div>
        )}
      </Card>

      <AttendanceRoleLogicForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSave}
        editingItem={editingItem}
        statusOptions={statusOptions}
      />
    </div>
  );
};

export default AttendanceRoleLogic;
