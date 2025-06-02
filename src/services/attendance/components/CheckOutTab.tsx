
import React from "react";
import { Card } from "@/components/ui/card";

interface CheckOutTabProps {
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

const CheckOutTab: React.FC<CheckOutTabProps> = (props) => {
  return (
    <Card className="p-6">
      <div className="text-center text-gray-500">
        <h3 className="text-lg font-medium mb-2">Check-Out Management</h3>
        <p>Mark employee check-outs for the selected date</p>
      </div>
    </Card>
  );
};

export default CheckOutTab;
