
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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  roleName: z.string().min(1, "Role name is required"),
  attendanceType: z.string().min(1, "Attendance type is required"),
  projectRequired: z.boolean(),
  locationRequired: z.boolean(),
  autoSubmit: z.boolean(),
  requiresComment: z.boolean(),
  defaultCommentLabel: z.string().optional(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface RoleAttendanceLogicFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  editingItem?: any;
}

const attendanceTypeOptions = [
  "Sick Leave",
  "Casual Leave", 
  "Present",
  "Check-In",
  "Check-Out",
  "Check-In / Check-Out"
];

// Available roles that can be selected
const availableRoles = [
  "Supervisor",
  "Medical Officer",
  "Camp Boss",
  "United Emirates Officer",
  "Safety Officer",
  "Quality Inspector",
  "Site Engineer",
  "Foreman",
  "Security Guard"
];

export const RoleAttendanceLogicForm = ({
  isOpen,
  onClose,
  onSave,
  editingItem,
}: RoleAttendanceLogicFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleName: "",
      attendanceType: "",
      projectRequired: true,
      locationRequired: true,
      autoSubmit: false,
      requiresComment: false,
      defaultCommentLabel: "",
      description: "",
    },
  });

  useEffect(() => {
    if (editingItem) {
      form.reset({
        roleName: editingItem.roleName,
        attendanceType: editingItem.attendanceType,
        projectRequired: editingItem.projectRequired,
        locationRequired: editingItem.locationRequired,
        autoSubmit: editingItem.autoSubmit,
        requiresComment: editingItem.requiresComment,
        defaultCommentLabel: editingItem.defaultCommentLabel || "",
        description: editingItem.description || "",
      });
    } else {
      form.reset({
        roleName: "",
        attendanceType: "",
        projectRequired: true,
        locationRequired: true,
        autoSubmit: false,
        requiresComment: false,
        defaultCommentLabel: "",
        description: "",
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
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? "Edit Role Attendance Logic" : "Add Role Attendance Logic"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Two-column layout for form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Column - Basic Fields */}
              <div className="space-y-4">
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
                            <SelectItem key={role} value={role}>
                              {role}
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
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select attendance type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {attendanceTypeOptions.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
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
                  name="defaultCommentLabel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Comment Label</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Enter sick leave reason" 
                          {...field}
                        />
                      </FormControl>
                      <div className="text-xs text-muted-foreground">
                        Placeholder text for comment input
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Second Column - Toggle Fields */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="projectRequired"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm">Project Required</FormLabel>
                        <div className="text-xs text-muted-foreground">
                          Require project selection
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
                  name="locationRequired"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm">Location Required</FormLabel>
                        <div className="text-xs text-muted-foreground">
                          Require location selection
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
                  name="autoSubmit"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm">Auto Submit</FormLabel>
                        <div className="text-xs text-muted-foreground">
                          Submit automatically after capture
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
                  name="requiresComment"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm">Requires Comment</FormLabel>
                        <div className="text-xs text-muted-foreground">
                          Require comment input
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
              </div>
            </div>

            {/* Full width description field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Optional notes for admin use" 
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground">
                    Internal notes about this role's attendance logic
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
