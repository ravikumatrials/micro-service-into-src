
import { useState } from 'react';
import { Search, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Employee } from "./EmployeeTable";

interface ImportAttendanceDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date | undefined;
  importFile: File | null;
  setImportFile: (file: File | null) => void;
  importPreviewData: Employee[];
  setImportPreviewData: (data: Employee[]) => void;
  importComment: string;
  setImportComment: (comment: string) => void;
  importAttendanceType: "check-in" | "check-out";
  setImportAttendanceType: (type: "check-in" | "check-out") => void;
  attendanceTime: string;
  setAttendanceTime: (time: string) => void;
  onImportConfirm: () => void;
  projectOptions: string[];
  locationOptions: string[];
  categoryOptions: string[];
  classificationOptions: string[];
}

const ImportAttendanceDrawer = ({
  isOpen,
  onOpenChange,
  date,
  importFile,
  setImportFile,
  importPreviewData,
  setImportPreviewData,
  importComment,
  setImportComment,
  importAttendanceType,
  setImportAttendanceType,
  attendanceTime,
  setAttendanceTime,
  onImportConfirm,
  projectOptions,
  locationOptions,
  categoryOptions,
  classificationOptions
}: ImportAttendanceDrawerProps) => {
  // Import filters state
  const [importProjectFilter, setImportProjectFilter] = useState<string>("");
  const [importLocationFilter, setImportLocationFilter] = useState<string>("");
  const [importCategoryFilter, setImportCategoryFilter] = useState<string>("");
  const [importClassificationFilter, setImportClassificationFilter] = useState<string>("");
  const [importSearchQuery, setImportSearchQuery] = useState<string>("");
  const [importSelectedEmployees, setImportSelectedEmployees] = useState<string[]>([]);
  const [importSelectAll, setImportSelectAll] = useState(false);
  
  // Filter imported employees based on import filters
  const filteredImportEmployees = importPreviewData.filter((employee) => {
    if (importProjectFilter && employee.project !== importProjectFilter) return false;
    if (importLocationFilter && employee.location !== importLocationFilter) return false;
    if (importCategoryFilter && employee.category !== importCategoryFilter) return false;
    if (importClassificationFilter && employee.classification !== importClassificationFilter) return false;
    if (importSearchQuery && 
        !employee.name.toLowerCase().includes(importSearchQuery.toLowerCase()) && 
        !employee.id.toLowerCase().includes(importSearchQuery.toLowerCase())) return false;
    return true;
  });
  
  // Handle import select all
  const handleImportSelectAll = () => {
    if (importSelectAll) {
      setImportSelectedEmployees([]);
    } else {
      setImportSelectedEmployees(filteredImportEmployees.map(e => e.id));
    }
    setImportSelectAll(!importSelectAll);
  };
  
  // Handle import checkbox change
  const handleImportCheckboxChange = (employeeId: string) => {
    setImportSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };
  
  // Clear import filters
  const clearImportFilters = () => {
    setImportProjectFilter("");
    setImportLocationFilter("");
    setImportCategoryFilter("");
    setImportClassificationFilter("");
    setImportSearchQuery("");
  };
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportFile(file);
      
      // In a real app, we would parse the file here
      // For this prototype, we'll simulate using the passed data
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] p-0">
        <DrawerHeader className="px-6 py-4 border-b">
          <DrawerTitle className="text-xl">Import Attendance Data</DrawerTitle>
          <DrawerDescription>
            Upload an Excel or Word file containing employee data for bulk attendance marking.
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="p-6 overflow-y-auto">
          {!importFile ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="mx-auto flex flex-col items-center">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4">
                  <path d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
                <h3 className="text-lg font-medium mb-2">Upload Attendance Data</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Supported formats: Excel (.xlsx) or Word (.doc/.docx)
                </p>
                <Input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".xlsx,.doc,.docx"
                  onChange={handleFileChange}
                />
                <Label 
                  htmlFor="file-upload" 
                  className="bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded cursor-pointer"
                >
                  Select File
                </Label>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium">Preview Data</h3>
                  <p className="text-sm text-gray-500">
                    {importFile.name} • {importPreviewData.length} employees
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setImportFile(null);
                    setImportPreviewData([]);
                    clearImportFilters();
                    setImportSelectedEmployees([]);
                    setImportSelectAll(false);
                  }}
                >
                  Change File
                </Button>
              </div>
              
              {/* Filter Section */}
              <Card className="p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Project Filter */}
                  <div className="space-y-1">
                    <Label htmlFor="import-project" className="text-sm">Project</Label>
                    <Select value={importProjectFilter} onValueChange={setImportProjectFilter}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="All Projects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Projects</SelectItem>
                        {projectOptions.map((p) => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Filter */}
                  <div className="space-y-1">
                    <Label htmlFor="import-location" className="text-sm">Location</Label>
                    <Select value={importLocationFilter} onValueChange={setImportLocationFilter}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Locations</SelectItem>
                        {locationOptions.map((l) => (
                          <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-1">
                    <Label htmlFor="import-category" className="text-sm">Category</Label>
                    <Select value={importCategoryFilter} onValueChange={setImportCategoryFilter}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        {categoryOptions.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Classification Filter */}
                  <div className="space-y-1">
                    <Label htmlFor="import-classification" className="text-sm">Classification</Label>
                    <Select value={importClassificationFilter} onValueChange={setImportClassificationFilter}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="All Classifications" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Classifications</SelectItem>
                        {classificationOptions.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Search by Name/ID */}
                  <div className="space-y-1">
                    <Label htmlFor="import-search" className="text-sm">Search by Name/ID</Label>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="import-search"
                        placeholder="Search..."
                        className="pl-8 h-9"
                        value={importSearchQuery}
                        onChange={(e) => setImportSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Reset Filters Button */}
                <div className="mt-3 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearImportFilters} 
                    className="text-xs"
                  >
                    <X className="h-3 w-3 mr-1" /> Clear Filters
                  </Button>
                </div>
              </Card>
              
              <Separator className="my-4" />
              
              {/* Preview Table */}
              <div className="border rounded mb-4">
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-2 w-16">
                          <Checkbox 
                            checked={importSelectAll} 
                            onCheckedChange={handleImportSelectAll}
                            aria-label="Select all employees"
                          />
                        </th>
                        <th className="px-4 py-2 text-left">Employee ID</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Classification</th>
                        <th className="px-4 py-2 text-left">Project</th>
                        <th className="px-4 py-2 text-left">Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredImportEmployees.length > 0 ? (
                        filteredImportEmployees.map((employee) => (
                          <tr key={employee.id} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-2">
                              <Checkbox 
                                checked={importSelectedEmployees.includes(employee.id)}
                                onCheckedChange={() => handleImportCheckboxChange(employee.id)}
                                aria-label={`Select ${employee.name}`}
                              />
                            </td>
                            <td className="px-4 py-2 font-medium">{employee.id}</td>
                            <td className="px-4 py-2">{employee.name}</td>
                            <td className="px-4 py-2">{employee.category}</td>
                            <td className="px-4 py-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                employee.classification === "Staff" 
                                  ? "bg-blue-100 text-blue-700" 
                                  : "bg-green-100 text-green-700"
                              }`}>
                                {employee.classification}
                              </span>
                            </td>
                            <td className="px-4 py-2">{employee.project}</td>
                            <td className="px-4 py-2">{employee.location}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center py-8 text-gray-400">
                            No employees found matching the filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Summary */}
              <div className="mb-4 text-sm text-gray-600">
                <p>Showing {filteredImportEmployees.length} of {importPreviewData.length} employees</p>
                <p>Selected: {importSelectedEmployees.length} employees</p>
              </div>
              
              {/* Attendance Type and Comment */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Attendance Type</Label>
                    <Select 
                      value={importAttendanceType} 
                      onValueChange={(value) => setImportAttendanceType(value as "check-in" | "check-out")}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="check-in">Check-In</SelectItem>
                        <SelectItem value="check-out">Check-Out</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input 
                      id="import-time"
                      type="time" 
                      value={attendanceTime}
                      onChange={(e) => setAttendanceTime(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="importComment">Reason/Comment</Label>
                  <Textarea 
                    id="importComment"
                    placeholder="Enter reason for bulk attendance marking..."
                    value={importComment}
                    onChange={(e) => setImportComment(e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">Required for manual entry</p>
                </div>
              </div>
            </>
          )}
        </div>

        <DrawerFooter className="border-t p-4">
          <div className="flex justify-end gap-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button 
              className="bg-proscape hover:bg-proscape-dark text-white"
              onClick={onImportConfirm}
              disabled={!importFile || !importComment.trim() || importSelectedEmployees.length === 0}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4">
                <path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg> Mark Attendance
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ImportAttendanceDrawer;
