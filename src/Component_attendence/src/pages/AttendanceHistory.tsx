
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Filter, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import AttendanceDetailModal from '@/components/AttendanceDetailModal';

// Updated mock data with realistic examples
const MOCK_ATTENDANCE = [
  {
    id: 1,
    employeeId: '1001',
    name: 'Ahmed Khan',
    project: 'Project A',
    category: 'Carpenter',
    classification: 'Laborer',
    entity: 'Tanseeq Investment',
    date: '2024-04-01',
    checkInTime: '08:30',
    checkOutTime: '17:15',
    mode: 'Face',
    comment: null
  },
  {
    id: 2,
    employeeId: '1002',
    name: 'R. Iyer',
    project: 'Project B',
    category: 'Mason',
    classification: 'Staff',
    entity: 'Tanseeq Investment',
    date: '2024-04-01',
    checkInTime: '09:00',
    checkOutTime: '18:00',
    mode: 'Manual',
    comment: 'Late'
  },
  {
    id: 3,
    employeeId: '1003',
    name: 'L. Kumar',
    project: 'Project A',
    category: 'Plumber',
    classification: 'Laborer',
    entity: 'Skyline Builders',
    date: '2024-04-02',
    checkInTime: '08:45',
    checkOutTime: '17:30',
    mode: 'Face',
    comment: null
  },
  {
    id: 4,
    employeeId: 'EMP004',
    name: 'Robert Williams',
    project: 'Bridge Expansion',
    category: 'Electrician',
    classification: 'Staff',
    entity: 'Skyline Builders',
    date: '2025-04-24',
    checkInTime: '08:05',
    checkOutTime: '17:00',
    mode: 'Face',
    comment: null
  },
  {
    id: 5,
    employeeId: 'EMP005',
    name: 'Michael Brown',
    project: 'Warehouse Project',
    category: 'Supervisor',
    classification: 'Staff',
    entity: 'Acme Construction',
    date: '2025-04-24',
    checkInTime: '07:45',
    checkOutTime: '18:15',
    mode: 'Manual',
    comment: 'Stayed late to complete urgent task'
  },
];

// Mock filter options
const PROJECTS = ['Project A', 'Project B', 'Bridge Expansion', 'Warehouse Project'];
const CATEGORIES = ['Carpenter', 'Mason', 'Electrician', 'Plumber', 'Supervisor'];
const ENTITIES = ['Tanseeq Investment', 'Skyline Builders', 'Acme Construction'];
const CLASSIFICATIONS = ['Laborer', 'Staff'];

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
  const [classification, setClassification] = useState('');
  
  // Modal state for viewing attendance details
  const [selectedRecord, setSelectedRecord] = useState<typeof MOCK_ATTENDANCE[0] | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Filter the attendance data
  const filteredAttendance = MOCK_ATTENDANCE.filter(record => {
    const recordDate = new Date(record.date);
    const matchesEmployeeId = !employeeId || record.employeeId.toLowerCase().includes(employeeId.toLowerCase());
    const matchesDateRange = (!fromDate || recordDate >= fromDate) && (!toDate || recordDate <= toDate);
    const matchesProject = !project || record.project === project;
    const matchesCategory = !category || record.category === category;
    const matchesEntity = !entity || record.entity === entity;
    const matchesMode = !mode || record.mode === mode;
    const matchesClassification = !classification || record.classification === classification;
    
    return matchesEmployeeId && matchesDateRange && matchesProject && 
           matchesCategory && matchesEntity && matchesMode && matchesClassification;
  });

  const clearFilters = () => {
    setEmployeeId('');
    setFromDate(new Date(new Date().setDate(new Date().getDate() - 7)));
    setToDate(new Date());
    setProject('');
    setCategory('');
    setEntity('');
    setMode('');
    setClassification('');
  };

  const handleViewDetails = (record: typeof MOCK_ATTENDANCE[0]) => {
    setSelectedRecord(record);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Attendance History</h1>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <Label htmlFor="employeeId">Employee ID</Label>
            <Input
              id="employeeId"
              placeholder="Search employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>
          
          <div>
            <Label>From Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fromDate ? format(fromDate, 'PP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label>To Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {toDate ? format(toDate, 'PP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={toDate} onSelect={setToDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label>Project</Label>
            <Select value={project} onValueChange={setProject}>
              <SelectTrigger>
                <SelectValue placeholder="All projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All projects</SelectItem>
                {PROJECTS.map(p => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All categories</SelectItem>
                {CATEGORIES.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Entity</Label>
            <Select value={entity} onValueChange={setEntity}>
              <SelectTrigger>
                <SelectValue placeholder="All entities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All entities</SelectItem>
                {ENTITIES.map(e => (
                  <SelectItem key={e} value={e}>{e}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Mode</Label>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger>
                <SelectValue placeholder="All modes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All modes</SelectItem>
                <SelectItem value="Face">Face</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Classification</Label>
            <Select value={classification} onValueChange={setClassification}>
              <SelectTrigger>
                <SelectValue placeholder="All classifications" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All classifications</SelectItem>
                {CLASSIFICATIONS.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendance.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                  No attendance records found matching the selected filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredAttendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.employeeId}</TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.project}</TableCell>
                  <TableCell>{record.category}</TableCell>
                  <TableCell>{record.entity}</TableCell>
                  <TableCell>{format(new Date(record.date), 'PP')}</TableCell>
                  <TableCell>{record.checkInTime}</TableCell>
                  <TableCell>{record.checkOutTime}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      record.mode === 'Face' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {record.mode}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(record)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Attendance Detail Modal */}
      <AttendanceDetailModal
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        record={selectedRecord}
      />
    </div>
  );
};

export default AttendanceHistory;
