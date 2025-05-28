
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
import { RoleAttendanceLogicForm } from "@/components/master/RoleAttendanceLogicForm";
import { Switch } from "@/components/ui/switch";

// Default role entries as specified
const defaultRoleLogicData = [
  {
    id: 1,
    roleName: "Supervisor",
    attendanceType: "Check-In / Check-Out",
    projectRequired: true,
    locationRequired: true,
    autoSubmit: false,
    requiresComment: false,
    defaultCommentLabel: "",
    description: "Standard supervisor attendance with full location and project tracking"
  },
  {
    id: 2,
    roleName: "Medical Officer",
    attendanceType: "Sick Leave",
    projectRequired: false,
    locationRequired: false,
    autoSubmit: true,
    requiresComment: true,
    defaultCommentLabel: "Enter sick leave reason",
    description: "Medical officer can mark employees as sick leave"
  },
  {
    id: 3,
    roleName: "Camp Boss",
    attendanceType: "Casual Leave",
    projectRequired: false,
    locationRequired: false,
    autoSubmit: true,
    requiresComment: true,
    defaultCommentLabel: "Enter casual leave reason",
    description: "Camp boss can approve casual leave requests"
  },
  {
    id: 4,
    roleName: "United Emirates Officer",
    attendanceType: "Present",
    projectRequired: false,
    locationRequired: false,
    autoSubmit: true,
    requiresComment: true,
    defaultCommentLabel: "Enter ID/Visa status",
    description: "UAE officer verifies employee ID and visa status"
  }
];

const RoleAttendanceLogic = () => {
  const isMobile = useIsMobile();
  const [roleLogicData, setRoleLogicData] = useState(defaultRoleLogicData);
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
    const deletedItem = roleLogicData.find(item => item.id === id);
    setRoleLogicData(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Role Logic Deleted",
      description: `Attendance logic for ${deletedItem?.roleName} has been removed.`,
    });
  };

  const handleSave = (data: any) => {
    if (editingItem) {
      // Check for duplicate role (excluding current item)
      const isDuplicate = roleLogicData.some(
        item => item.roleName === data.roleName && item.id !== editingItem.id
      );
      
      if (isDuplicate) {
        toast({
          title: "Duplicate Role",
          description: `Logic for ${data.roleName} already exists.`,
          variant: "destructive",
        });
        return;
      }

      // Update existing item
      setRoleLogicData(prev => 
        prev.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item)
      );
      toast({
        title: "Role Logic Updated",
        description: `Attendance logic updated for ${data.roleName}`,
      });
    } else {
      // Check for duplicate role
      const isDuplicate = roleLogicData.some(item => item.roleName === data.roleName);
      
      if (isDuplicate) {
        toast({
          title: "Duplicate Role",
          description: `Logic for ${data.roleName} already exists.`,
          variant: "destructive",
        });
        return;
      }

      // Add new item
      const newItem = { ...data, id: Math.max(...roleLogicData.map(r => r.id)) + 1 };
      setRoleLogicData(prev => [...prev, newItem]);
      toast({
        title: "Role Logic Added",
        description: `Attendance logic created for ${data.roleName}`,
      });
    }
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const getAttendanceTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Present":
        return "bg-green-100 text-green-800 border-green-200";
      case "Sick Leave":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Casual Leave":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Check-In / Check-Out":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Role Attendance Logic</h1>
          <p className="text-gray-600 mt-1">Configure attendance behavior and requirements for different user roles</p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Role Logic
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Role Logic Configuration</h2>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {roleLogicData.length} roles configured
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
                          <AlertDialogTitle>Delete Role Logic</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this role attendance logic? This action cannot be undone.
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
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Attendance Type:</span>
                    <Badge className={`ml-2 ${getAttendanceTypeBadgeColor(config.attendanceType)}`}>
                      {config.attendanceType}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Project Required:</span>
                    <span className="ml-2">{config.projectRequired ? "Yes" : "No"}</span>
                  </div>
                  <div>
                    <span className="font-medium">Location Required:</span>
                    <span className="ml-2">{config.locationRequired ? "Yes" : "No"}</span>
                  </div>
                  <div>
                    <span className="font-medium">Auto Submit:</span>
                    <span className="ml-2">{config.autoSubmit ? "Yes" : "No"}</span>
                  </div>
                  <div>
                    <span className="font-medium">Requires Comment:</span>
                    <span className="ml-2">{config.requiresComment ? "Yes" : "No"}</span>
                  </div>
                  {config.defaultCommentLabel && (
                    <div>
                      <span className="font-medium">Comment Label:</span>
                      <span className="ml-2 text-gray-700">{config.defaultCommentLabel}</span>
                    </div>
                  )}
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
                <TableHead>Project Req.</TableHead>
                <TableHead>Location Req.</TableHead>
                <TableHead>Auto Submit</TableHead>
                <TableHead>Requires Comment</TableHead>
                <TableHead>Comment Label</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roleLogicData.map((config) => (
                <TableRow key={config.id}>
                  <TableCell className="font-medium">{config.roleName}</TableCell>
                  <TableCell>
                    <Badge className={getAttendanceTypeBadgeColor(config.attendanceType)}>
                      {config.attendanceType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch checked={config.projectRequired} disabled />
                  </TableCell>
                  <TableCell>
                    <Switch checked={config.locationRequired} disabled />
                  </TableCell>
                  <TableCell>
                    <Switch checked={config.autoSubmit} disabled />
                  </TableCell>
                  <TableCell>
                    <Switch checked={config.requiresComment} disabled />
                  </TableCell>
                  <TableCell className="text-gray-700 max-w-[150px] truncate">
                    {config.defaultCommentLabel || "N/A"}
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
                            <AlertDialogTitle>Delete Role Logic</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this role attendance logic? This action cannot be undone.
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
            <p>No role attendance logic configured</p>
            <p className="text-sm">Click "Add Role Logic" to get started</p>
          </div>
        )}
      </Card>

      <RoleAttendanceLogicForm
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

export default RoleAttendanceLogic;
