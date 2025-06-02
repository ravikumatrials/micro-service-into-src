
import React from "react";
import { Card } from "@/components/ui/card";

interface ExceptionTabProps {
  searchQuery: string;
  selectedProject: string;
  selectedClassification: string;
  selectedCategory: string;
  selectedStatus: string;
  selectedEntity: string;
  projects: any[];
  locations: any[];
  selectedDate: Date;
  dateSelected: boolean;
}

const ExceptionTab: React.FC<ExceptionTabProps> = (props) => {
  return (
    <Card className="p-6">
      <div className="text-center text-gray-500">
        <h3 className="text-lg font-medium mb-2">Exception Management</h3>
        <p>Handle attendance exceptions and special cases</p>
      </div>
    </Card>
  );
};

export default ExceptionTab;
