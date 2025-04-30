
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

// Import the components we created
import BulkAttendanceFilters from "@/components/bulk-attendance/BulkAttendanceFilters";
import EmployeeTable from "@/components/bulk-attendance/EmployeeTable";
import MarkAttendanceDialog from "@/components/bulk-attendance/MarkAttendanceDialog";
import ImportAttendanceDrawer from "@/components/bulk-attendance/ImportAttendanceDrawer";
import { MOCK_EMPLOYEES, PROJECTS, LOCATIONS, CATEGORIES, CLASSIFICATIONS } from "@/components/bulk-attendance/constants";

const BulkAttendance = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [project, setProject] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [classification, setClassification] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // State for selected employees and modal
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendanceType, setAttendanceType] = useState<"check-in" | "check-out">("check-in");
  const [attendanceTime, setAttendanceTime] = useState(format(new Date(), "HH:mm"));
  const [reason, setReason] = useState("");
  
  // Import drawer state
  const [isImportDrawerOpen, setIsImportDrawerOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importPreviewData, setImportPreviewData] = useState<typeof MOCK_EMPLOYEES>([]);
  const [importComment, setImportComment] = useState("");
  const [importAttendanceType, setImportAttendanceType] = useState<"check-in" | "check-out">("check-in");

  // Filter employees based on filters
  const filteredEmployees = MOCK_EMPLOYEES.filter((employee) => {
    if (project && employee.project !== project) return false;
    if (location && employee.location !== location) return false;
    if (category && employee.category !== category) return false;
    if (classification && employee.classification !== classification) return false;
    if (searchQuery && 
        !employee.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !employee.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map(e => e.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle checkbox change
  const handleCheckboxChange = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  // Handle mark attendance
  const handleMarkAttendance = () => {
    setIsModalOpen(true);
  };

  // Handle confirmation
  const handleConfirm = () => {
    toast({
      title: "Success!",
      description: `Attendance marked for ${selectedEmployees.length} employees on ${format(date || new Date(), "MMM dd, yyyy")}.`,
    });
    setIsModalOpen(false);
    setSelectedEmployees([]);
    setSelectAll(false);
  };
  
  // Handle import button click
  const handleImportClick = () => {
    setIsImportDrawerOpen(true);
  };
  
  // Handle import attendance marking
  const handleImportAttendanceMark = () => {
    if (importComment.trim() === "") {
      toast({
        title: "Error",
        description: "Please provide a reason for the import.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Success!",
      description: `Attendance ${importAttendanceType === "check-in" ? "check-in" : "check-out"} marked for ${selectedEmployees.length} employees on ${format(date || new Date(), "MMM dd, yyyy")}.`,
    });
    setIsImportDrawerOpen(false);
    setImportFile(null);
    setImportPreviewData([]);
    setImportComment("");
    setSelectedEmployees([]);
    setSelectAll(false);
  };

  // When a file is selected, set the preview data
  const handleFileSelected = (file: File | null) => {
    if (file) {
      // In a real app, we would parse the file
      // For this prototype, we'll use our mock data
      setImportPreviewData(MOCK_EMPLOYEES);
    } else {
      setImportPreviewData([]);
    }
  };

  return (
    <div className="space-y-5 px-1 pt-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-5">Bulk Attendance</h1>
        
        {/* Filter Section Component */}
        <BulkAttendanceFilters
          date={date}
          setDate={setDate}
          project={project}
          setProject={setProject}
          location={location}
          setLocation={setLocation}
          category={category}
          setCategory={setCategory}
          classification={classification}
          setClassification={setClassification}
          status={status}
          setStatus={setStatus}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onImportClick={handleImportClick}
          onMarkAttendance={handleMarkAttendance}
          selectedEmployeesCount={selectedEmployees.length}
          projectOptions={PROJECTS}
          locationOptions={LOCATIONS}
          categoryOptions={CATEGORIES}
          classificationOptions={CLASSIFICATIONS}
        />

        {/* Employees Table Card */}
        <Card className="p-0 overflow-x-auto shadow-sm">
          <EmployeeTable
            employees={filteredEmployees}
            selectedEmployees={selectedEmployees}
            onSelectAll={handleSelectAll}
            onCheckboxChange={handleCheckboxChange}
            selectAll={selectAll}
          />
        </Card>

        {/* Summary Footer */}
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600 px-2">
          <p>Total: {filteredEmployees.length} employees</p>
          <p>Selected: {selectedEmployees.length} employees</p>
        </div>
      </div>

      {/* Mark Attendance Dialog Component */}
      <MarkAttendanceDialog
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedCount={selectedEmployees.length}
        date={date}
        attendanceType={attendanceType}
        setAttendanceType={setAttendanceType}
        attendanceTime={attendanceTime}
        setAttendanceTime={setAttendanceTime}
        reason={reason}
        setReason={setReason}
        onConfirm={handleConfirm}
      />
      
      {/* Import Attendance Drawer Component */}
      <ImportAttendanceDrawer
        isOpen={isImportDrawerOpen}
        onOpenChange={setIsImportDrawerOpen}
        date={date}
        importFile={importFile}
        setImportFile={(file) => {
          setImportFile(file);
          handleFileSelected(file);
        }}
        importPreviewData={importPreviewData}
        setImportPreviewData={setImportPreviewData}
        importComment={importComment}
        setImportComment={setImportComment}
        importAttendanceType={importAttendanceType}
        setImportAttendanceType={setImportAttendanceType}
        attendanceTime={attendanceTime}
        setAttendanceTime={setAttendanceTime}
        onImportConfirm={handleImportAttendanceMark}
        projectOptions={PROJECTS}
        locationOptions={LOCATIONS}
        categoryOptions={CATEGORIES}
        classificationOptions={CLASSIFICATIONS}
      />
    </div>
  );
};

export default BulkAttendance;
