
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';

// Mock data for attendance history
const MOCK_ATTENDANCE = [
  {
    id: 1,
    employeeId: 'EMP001',
    name: 'John Smith',
    project: 'Main Building Construction',
    category: 'Carpenter',
    entity: 'Acme Construction',
    date: '2025-04-25',
    checkInTime: '08:00',
    checkOutTime: '17:00',
    mode: 'Face',
  },
  {
    id: 2,
    employeeId: 'EMP002',
    name: 'Sarah Johnson',
    project: 'Main Building Construction',
    category: 'Mason',
    entity: 'Acme Construction',
    date: '2025-04-25',
    checkInTime: '07:55',
    checkOutTime: '17:10',
    mode: 'Face',
  },
  {
    id: 3,
    employeeId: 'EMP003',
    name: 'Emily Davis',
    project: 'Bridge Expansion',
    category: 'Plumber',
    entity: 'Skyline Builders',
    date: '2025-04-25',
    checkInTime: '08:10',
    checkOutTime: '16:45',
    mode: 'Manual',
  },
  {
    id: 4,
    employeeId: 'EMP004',
    name: 'Robert Williams',
    project: 'Bridge Expansion',
    category: 'Electrician',
    entity: 'Skyline Builders',
    date: '2025-04-24',
    checkInTime: '08:05',
    checkOutTime: '17:00',
    mode: 'Face',
  },
  {
    id: 5,
    employeeId: 'EMP005',
    name: 'Michael Brown',
    project: 'Warehouse Project',
    category: 'Supervisor',
    entity: 'Acme Construction',
    date: '2025-04-24',
    checkInTime: '07:45',
    checkOutTime: '18:15',
    mode: 'Manual',
  },
];

// Mock filter options
const PROJECTS = ['Main Building Construction', 'Bridge Expansion', 'Warehouse Project'];
const CATEGORIES = ['Carpenter', 'Mason', 'Electrician', 'Plumber', 'Supervisor'];
const ENTITIES = ['Acme Construction', 'Skyline Builders', 'Metro Developers'];

const AttendanceHistory = () => {
  // Filter states
  const [employeeId, setEmployeeId] = useState('');
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [project, setProject] = useState('');
  const [category, setCategory] = useState('');
  const [entity, setEntity] = useState('');
  const [mode, setMode] = useState('');

  // Apply filters to attendance data
  const filteredAttendance = MOCK_ATTENDANCE.filter((record) => {
    if (employeeId && !record.employeeId.toLowerCase().includes(employeeId.toLowerCase()) &&
        !record.name.toLowerCase().includes(employeeId.toLowerCase())) return false;
        
    const recordDate = new Date(record.date);
    if (fromDate && recordDate < fromDate) return false;
    if (toDate && recordDate > toDate) return false;
    
    if (project && record.project !== project) return false;
    if (category && record.category !== category) return false;
    if (entity && record.entity !== entity) return false;
    if (mode && record.mode !== mode) return false;
    
    return true;
  });

  return (
    <div className="space-y-6 px-1 pt-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-5">Attendance History</h1>
        
        {/* Filters */}
        <Card className="p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Employee ID Filter */}
            <div className="space-y-2">
              <Label htmlFor="employee-id">Employee ID/Name</Label>
              <Input
                id="employee-id"
                placeholder="Search by ID or name..."
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </div>

            {/* From Date Filter */}
            <div className="space-y-2">
              <Label htmlFor="from-date">From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="from-date"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {fromDate ? format(fromDate, 'PPP') : 'Select date'}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={setFromDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* To Date Filter */}
            <div className="space-y-2">
              <Label htmlFor="to-date">To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="to-date"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {toDate ? format(toDate, 'PPP') : 'Select date'}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={setToDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Project Filter */}
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Select value={project} onValueChange={setProject}>
                <SelectTrigger id="project">
                  <SelectValue placeholder="All Projects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-projects">All Projects</SelectItem>
                  {PROJECTS.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Entity Filter */}
            <div className="space-y-2">
              <Label htmlFor="entity">Entity (Company)</Label>
              <Select value={entity} onValueChange={setEntity}>
                <SelectTrigger id="entity">
                  <SelectValue placeholder="All Entities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-entities">All Entities</SelectItem>
                  {ENTITIES.map((e) => (
                    <SelectItem key={e} value={e}>{e}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Attendance Mode Filter */}
            <div className="space-y-2">
              <Label htmlFor="mode">Attendance Mode</Label>
              <Select value={mode} onValueChange={setMode}>
                <SelectTrigger id="mode">
                  <SelectValue placeholder="All Modes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-modes">All Modes</SelectItem>
                  <SelectItem value="Face">Face</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filter Button */}
            <div className="space-y-2 flex items-end">
              <Button className="bg-proscape hover:bg-proscape-dark text-white w-full">
                <Filter className="mr-2 h-4 w-4" /> Apply Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Attendance History Table */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Check-In</TableHead>
                <TableHead>Check-Out</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Mode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((record) => (
                  <TableRow key={record.id} className="hover:bg-gray-50">
                    <TableCell>{format(new Date(record.date), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{record.employeeId}</TableCell>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.checkInTime}</TableCell>
                    <TableCell>{record.checkOutTime}</TableCell>
                    <TableCell>{record.project}</TableCell>
                    <TableCell>{record.category}</TableCell>
                    <TableCell>{record.entity}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          record.mode === 'Face'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {record.mode}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                    No attendance records found matching the filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredAttendance.length} of {MOCK_ATTENDANCE.length} records
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistory;
