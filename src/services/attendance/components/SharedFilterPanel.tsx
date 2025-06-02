
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, RotateCcw } from "lucide-react";

interface FilterPanelProps {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  onReset: () => void;
  onApply: () => void;
}

const SharedFilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  setFilters,
  onReset,
  onApply
}) => {
  const classifications = [
    { value: "all", label: "All Classifications" },
    { value: "staff", label: "Staff" },
    { value: "laborer", label: "Laborer" }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "engineer", label: "Engineer" },
    { value: "worker", label: "Worker" },
    { value: "supervisor", label: "Supervisor" }
  ];

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-medium">Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Employee ID</label>
          <Input
            placeholder="Enter ID"
            value={filters.employeeId}
            onChange={(e) => setFilters(prev => ({ ...prev, employeeId: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <Input
            placeholder="Enter name"
            value={filters.name}
            onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Classification</label>
          <Select value={filters.classification} onValueChange={(value) => setFilters(prev => ({ ...prev, classification: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {classifications.map(item => (
                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(item => (
                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(item => (
                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end gap-2">
          <Button onClick={onApply} className="flex-1">Apply</Button>
          <Button onClick={onReset} variant="outline">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SharedFilterPanel;
