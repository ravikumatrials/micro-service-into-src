
import React, { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";

interface Exception {
  id: number;
  employeeId: string;
  name: string;
  role: string;
  project: string;
  projectId: number;
  location: string;
  locationId: number;
  imageUrl: string;
  classification: string;
  category: string;
  status: "Active" | "Inactive";
  entity?: string;
  exceptionType: "missing_checkin" | "missing_checkout" | "late_arrival" | "early_departure";
  exceptionReason: string;
  exceptionDate: Date;
  resolved: boolean;
}

interface ExceptionTabProps {
  searchQuery: string;
  selectedProject: string;
  selectedLocation?: string;
  selectedClassification: string;
  selectedCategory: string;
  selectedStatus: string;
  selectedEntity: string;
  projects: { id: number; name: string; location?: string; coordinates?: { geofenceData: string } }[];
  locations: { id: number; name: string }[];
  selectedDate: Date;
  dateSelected?: boolean;
}

const ExceptionTab = ({
  searchQuery,
  selectedProject,
  selectedLocation = "all",
  selectedClassification,
  selectedCategory,
  selectedStatus,
  selectedEntity,
  projects,
  locations,
  selectedDate,
  dateSelected = true
}: ExceptionTabProps) => {
  const [exceptions, setExceptions] = useState<Exception[]>([]);
  
  useEffect(() => {
    fetchExceptions();
  }, [selectedDate]);
  
  const fetchExceptions = () => {
    const mockExceptions: Exception[] = [
      {
        id: 1,
        employeeId: "10001",
        name: "John Smith",
        role: "Site Manager",
        classification: "Staff",
        category: "Engineer",
        status: "Active",
        project: "Main Building Construction",
        projectId: 1,
        location: "Site A",
        locationId: 1,
        imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        exceptionType: "missing_checkout",
        exceptionReason: "Failed to check out at end of shift",
        exceptionDate: selectedDate,
        resolved: false
      },
      {
        id: 2,
        employeeId: "10002",
        name: "Sarah Johnson",
        role: "Safety Officer",
        classification: "Staff",
        category: "Safety",
        status: "Active",
        project: "Bridge Expansion Project",
        projectId: 2,
        location: "Site B",
        locationId: 2,
        imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
        exceptionType: "late_arrival",
        exceptionReason: "Arrived 30 minutes late due to traffic",
        exceptionDate: selectedDate,
        resolved: true
      }
    ];
    
    setExceptions(mockExceptions);
  };

  const filteredExceptions = exceptions.filter(exception => {
    const matchesSearch = exception.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         exception.employeeId.includes(searchQuery);
    const matchesProject = selectedProject === "all" || exception.projectId.toString() === selectedProject;
    const matchesLocation = selectedLocation === "all" || exception.locationId.toString() === selectedLocation;
    const matchesClassification = selectedClassification === "all" || exception.classification === selectedClassification;
    const matchesCategory = selectedCategory === "all" || exception.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || exception.status === selectedStatus;
    const matchesEntity = selectedEntity === "all" || exception.entity === getEntityName(selectedEntity);
    
    return matchesSearch && matchesProject && matchesLocation && 
           matchesClassification && matchesCategory && matchesStatus && matchesEntity;
  });

  const getEntityName = (entityId: string) => {
    if (entityId === "all") return "";
    
    const entityMap = {
      "1": "Tanseeq Landscaping LLC",
      "2": "Tanseeq Construction Ltd",
      "3": "Tanseeq Engineering Co"
    };
    
    return entityMap[entityId as keyof typeof entityMap] || "";
  };

  const getExceptionTypeName = (type: string) => {
    const typeMap = {
      "missing_checkin": "Missing Check-in",
      "missing_checkout": "Missing Check-out",
      "late_arrival": "Late Arrival",
      "early_departure": "Early Departure"
    };
    
    return typeMap[type as keyof typeof typeMap] || type;
  };

  const resolveException = (exceptionId: number) => {
    setExceptions(current => 
      current.map(exception => 
        exception.id === exceptionId 
          ? { ...exception, resolved: true }
          : exception
      )
    );
    
    const exception = exceptions.find(e => e.id === exceptionId);
    if (exception) {
      toast.success(`Exception resolved for ${exception.name}`, {
        description: `${getExceptionTypeName(exception.exceptionType)} has been marked as resolved.`
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-md shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Employee ID</TableHead>
              <TableHead className="w-[170px]">Employee Name</TableHead>
              <TableHead>Classification</TableHead>
              <TableHead>Exception Type</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExceptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                  No exceptions found for {format(selectedDate, "PPP")}
                </TableCell>
              </TableRow>
            ) : (
              filteredExceptions.map((exception) => (
                <TableRow key={exception.id}>
                  <TableCell className="font-medium">{exception.employeeId}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <img src={exception.imageUrl} alt={exception.name} />
                      </Avatar>
                      <div>{exception.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{exception.classification}</TableCell>
                  <TableCell>
                    <Badge variant={exception.resolved ? "secondary" : "destructive"}>
                      {getExceptionTypeName(exception.exceptionType)}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{exception.exceptionReason}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-600">
                      {exception.resolved ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                          <span className="text-green-600">Resolved</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-4 w-4 mr-1 text-orange-600" />
                          <span className="text-orange-600">Pending</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {!exception.resolved && (
                      <Button 
                        onClick={() => resolveException(exception.id)} 
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1 text-xs"
                      >
                        <CheckCircle className="h-3 w-3" />
                        <span>Resolve</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExceptionTab;
