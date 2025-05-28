
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { availableRoles } from "@/utils/roleUtils";

const formSchema = z.object({
  roleName: z.string().min(1, "Role name is required"),
  attendanceType: z.string().min(1, "Attendance type is required"),
  defaultStatus: z.string().min(1, "Default status is required"),
  requireComment: z.boolean(),
  autoProjectAssign: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

interface AttendanceRoleLogicFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  editingItem?: any;
  statusOptions: string[];
}

export const AttendanceRoleLogicForm = ({
  isOpen,
  onClose,
  onSave,
  editingItem,
  statusOptions,
}: AttendanceRoleLogicFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleName: "",
      attendanceType: "",
      defaultStatus: "",
      requireComment: false,
      autoProjectAssign: false,
    },
  });

  useEffect(() => {
    if (editingItem) {
      form.reset({
        roleName: editingItem.roleName,
        attendanceType: editingItem.attendanceType,
        defaultStatus: editingItem.defaultStatus,
        requireComment: editingItem.requireComment,
        autoProjectAssign: editingItem.autoProjectAssign,
      });
    } else {
      form.reset({
        roleName: "",
        attendanceType: "",
        defaultStatus: "",
        requireComment: false,
        autoProjectAssign: false,
      });
    }
  }, [editingItem, form]);

  const onSubmit = (data: FormData) => {
    onSave(data);
    form.reset();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? "Edit Attendance Role Logic" : "Add New Attendance Role Logic"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="roleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Name</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableRoles.map((role) => (
                        <SelectItem key={role.id} value={role.name}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attendanceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attendance Type</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Mark Sick Leave, Manual Attendance"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="defaultStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select default status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requireComment"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Require Comment</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Force users to enter a comment when marking attendance
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="autoProjectAssign"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Auto Project Assign</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Automatically assign project based on user's default project
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">
                {editingItem ? "Update Configuration" : "Add Configuration"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
