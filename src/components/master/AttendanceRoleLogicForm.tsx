
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
  attendanceStatus: z.string().min(1, "Attendance status is required"),
  commentRequired: z.boolean(),
  defaultReason: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface AttendanceRoleLogicFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  editingItem?: any;
}

const attendanceStatusOptions = ["Present", "Sick Leave", "Casual Leave"];

export const AttendanceRoleLogicForm = ({
  isOpen,
  onClose,
  onSave,
  editingItem,
}: AttendanceRoleLogicFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleName: "",
      attendanceStatus: "",
      commentRequired: false,
      defaultReason: "",
    },
  });

  useEffect(() => {
    if (editingItem) {
      form.reset({
        roleName: editingItem.roleName,
        attendanceStatus: editingItem.attendanceStatus,
        commentRequired: editingItem.commentRequired,
        defaultReason: editingItem.defaultReason || "",
      });
    } else {
      form.reset({
        roleName: "",
        attendanceStatus: "",
        commentRequired: false,
        defaultReason: "",
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
            {editingItem ? "Edit Attendance Logic" : "Add New Attendance Logic"}
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
                      {availableRoles
                        .filter(role => role.name !== "Supervisor") // Exclude Supervisor as mentioned
                        .map((role) => (
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
              name="attendanceStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attendance Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select attendance status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {attendanceStatusOptions.map((status) => (
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
              name="commentRequired"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Comment Required</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Require users to enter a comment when marking attendance
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
              name="defaultReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Reason (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter default reason or comment" 
                      {...field}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground">
                    This will be pre-filled when capturing attendance
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">
                {editingItem ? "Update Logic" : "Add Logic"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
