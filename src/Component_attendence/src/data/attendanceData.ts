
export interface AttendanceRecord {
  id: number;
  employeeId: string;
  name: string;
  project: string;
  category: string;
  classification: string;
  entity: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  mode: string;
  comment?: string;
}

export const mockAttendanceData: AttendanceRecord[] = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "John Smith",
    project: "Main Building Construction",
    category: "Engineer",
    classification: "Staff",
    entity: "Tanseeq LLC",
    date: "2024-01-15",
    checkInTime: "08:00",
    checkOutTime: "17:00",
    mode: "Face",
    comment: "Regular attendance"
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Sarah Johnson",
    project: "Bridge Expansion",
    category: "Supervisor",
    classification: "Staff",
    entity: "Tanseeq Construction",
    date: "2024-01-15",
    checkInTime: "07:45",
    checkOutTime: "16:30",
    mode: "Manual",
    comment: "Manual check-in due to face recognition issues"
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Michael Brown",
    project: "Highway Renovation",
    category: "Technician",
    classification: "Laborer",
    entity: "Tanseeq Engineering",
    date: "2024-01-15",
    checkInTime: "08:15",
    mode: "Face"
  }
];

export const mockProjects = [
  { id: 1, name: "Main Building Construction", location: "Downtown Site A" },
  { id: 2, name: "Bridge Expansion Project", location: "Highway Bridge Site" },
  { id: 3, name: "Highway Renovation", location: "Highway Sector 7" },
  { id: 4, name: "Dubai Mall Expansion", location: "Mall District" },
  { id: 5, name: "Marina Towers", location: "Marina District" }
];
