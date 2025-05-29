
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const attendanceTypeSchema = z.object({
  attendanceTypeName: z.string().min(1, "Attendance Type Name is required"),
  description: z.string().optional(),
  status: z.boolean().default(true),
});

type AttendanceTypeFormData = z.infer<typeof attendanceTypeSchema>;

interface AttendanceTypeFormProps {
  onSubmit?: (data: AttendanceTypeFormData) => void;
  initialData?: Partial<AttendanceTypeFormData>;
  mode?: "add" | "edit";
}

export function AttendanceTypeForm({ onSubmit, initialData, mode = "add" }: AttendanceTypeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AttendanceTypeFormData>({
    resolver: zodResolver(attendanceTypeSchema),
    defaultValues: {
      attendanceTypeName: initialData?.attendanceTypeName || "",
      description: initialData?.description || "",
      status: initialData?.status ?? true,
    },
  });

  const handleSubmit = async (data: AttendanceTypeFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting attendance type:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit?.(data);
      
      if (mode === "add") {
        toast.success("Attendance type created successfully!");
        form.reset();
      } else {
        toast.success("Attendance type updated successfully!");
      }
    } catch (error) {
      console.error("Error submitting attendance type:", error);
      toast.error("Failed to save attendance type. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{mode === "add" ? "Add New" : "Edit"} Attendance Type</CardTitle>
        <CardDescription>
          {mode === "add" 
            ? "Create a new attendance type for the system"
            : "Update attendance type information"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="attendanceTypeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attendance Type Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g., "Sick Leave"'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='e.g., "Used when employee is marked sick by Medical Officer"'
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Status</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      {field.value ? "Active" : "Inactive"}
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

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isSubmitting}
              >
                Reset
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : mode === "add" ? "Create" : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
