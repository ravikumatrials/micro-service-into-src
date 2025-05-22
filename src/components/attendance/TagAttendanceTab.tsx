
import React, { useState } from "react";
import { mockAttendanceRecords } from "./ManualAttendanceTable";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import TagAttendanceDialog from "./dialogs/TagAttendanceDialog";

interface TagAttendanceTabProps {
  searchQuery: string;
  selectedProject: string;
  selectedClassification: string;
  selectedCategory: string;
  selectedStatus: string;
  selectedEntity: string;
  projects: { id: number; name: string; coordinates?: { geofenceData: string }; location?: string }[];
  locations: { id: number; name: string }[];
  selectedDate: Date;
  dateSelected: boolean;
}

const TagAttendanceTab: React.FC<TagAttendanceTabProps> = ({
  searchQuery,
  selectedProject,
  selectedClassification,
  selectedCategory,
  selectedStatus,
  selectedEntity,
  projects,
  selectedDate,
  dateSelected
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  // Filter employees based on provided criteria
  const filteredEmployees = mockAttendanceRecords.filter(employee => {
    // Skip if date is not selected
    if (!dateSelected) {
      return false;
    }

    // Filter by search query (name or ID)
    if (
      searchQuery &&
      !employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !employee.employeeId.includes(searchQuery)
    ) {
      return false;
    }

    // Filter by entity
    if (selectedEntity !== "all" && employee.entity !== selectedEntity) {
      return false;
    }

    // Filter by classification
    if (selectedClassification !== "all" && employee.classification !== selectedClassification) {
      return false;
    }

    // Filter by category
    if (selectedCategory !== "all" && employee.category !== selectedCategory) {
      return false;
    }

    // Filter by status
    if (selectedStatus !== "all" && employee.status !== selectedStatus) {
      return false;
    }

    // Filter by project
    if (
      selectedProject !== "all" &&
      !employee.checkInProject.includes(selectedProject)
    ) {
      return false;
    }

    return true;
  });

  const handleTagAttendance = (employee: any) => {
    setSelectedEmployee(employee);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      {!dateSelected ? (
        <div className="p-8 text-center bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-700">
            Please select a date to tag employee attendance
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Tag Employee Attendance</h3>
          </div>
          <div className="border rounded-md overflow-hidden bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Employee ID</TableHead>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Classification</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.employeeId}</TableCell>
                      <TableCell>{employee.employeeName}</TableCell>
                      <TableCell>{employee.classification}</TableCell>
                      <TableCell>{employee.category}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          employee.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {employee.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTagAttendance(employee)}
                          className="flex items-center gap-1"
                        >
                          <Tag className="h-4 w-4" />
                          Tag Attendance
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No employees found matching the criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {/* Dialog for tagging attendance */}
      <TagAttendanceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        employee={selectedEmployee}
        date={selectedDate}
        projects={projects}
      />
    </div>
  );
};

export default TagAttendanceTab;
