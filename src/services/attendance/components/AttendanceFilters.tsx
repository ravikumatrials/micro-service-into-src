
import React from "react";
import SharedFilterPanel from "./SharedFilterPanel";

interface FilterValues {
  employeeId: string;
  name: string;
  classification: string;
  category: string;
  status: string;
  project: string;
  entity: string;
}

interface AttendanceFiltersProps {
  filters: FilterValues;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  onReset: () => void;
  onApply: () => void;
}

const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
  filters,
  setFilters,
  onReset,
  onApply
}) => {
  return (
    <SharedFilterPanel 
      filters={filters} 
      setFilters={setFilters} 
      onReset={onReset} 
      onApply={onApply}
    />
  );
};

export default AttendanceFilters;
