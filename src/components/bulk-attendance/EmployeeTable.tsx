
import { Checkbox } from "@/components/ui/checkbox";

export interface Employee {
  id: string;
  name: string;
  category: string;
  classification: string;
  entity: string;
  project: string;
  location: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  selectedEmployees: string[];
  onSelectAll: () => void;
  onCheckboxChange: (employeeId: string) => void;
  selectAll: boolean;
}

const EmployeeTable = ({
  employees,
  selectedEmployees,
  onSelectAll,
  onCheckboxChange,
  selectAll
}: EmployeeTableProps) => {
  return (
    <table className="w-full text-sm text-left text-gray-700">
      <thead className="text-xs uppercase bg-gray-50 border-b">
        <tr>
          <th className="px-4 py-3 w-16">
            <Checkbox 
              checked={selectAll} 
              onCheckedChange={onSelectAll} 
              aria-label="Select all employees"
            />
          </th>
          <th className="px-4 py-3">Employee ID</th>
          <th className="px-4 py-3">Name</th>
          <th className="px-4 py-3">Category</th>
          <th className="px-4 py-3">Classification</th>
          <th className="px-4 py-3">Project</th>
          <th className="px-4 py-3">Location</th>
        </tr>
      </thead>
      <tbody>
        {employees.length > 0 ? (
          employees.map((employee) => (
            <tr key={employee.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">
                <Checkbox 
                  checked={selectedEmployees.includes(employee.id)}
                  onCheckedChange={() => onCheckboxChange(employee.id)}
                  aria-label={`Select ${employee.name}`}
                />
              </td>
              <td className="px-4 py-3 font-medium">{employee.id}</td>
              <td className="px-4 py-3">{employee.name}</td>
              <td className="px-4 py-3">{employee.category}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  employee.classification === "Staff" 
                    ? "bg-blue-100 text-blue-700" 
                    : "bg-green-100 text-green-700"
                }`}>
                  {employee.classification}
                </span>
              </td>
              <td className="px-4 py-3">{employee.project}</td>
              <td className="px-4 py-3">{employee.location}</td>
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
  );
};

export default EmployeeTable;
