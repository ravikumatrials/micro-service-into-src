
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Filter } from "lucide-react";
import ReportFilters from "../components/ReportFilters";
import StatCards from "../components/StatCards";

const Reports = () => {
  const [filters, setFilters] = useState({
    dateRange: { from: null, to: null },
    project: "all",
    role: "all",
    attendanceType: "all",
    status: "all"
  });

  const handleExport = (format: string) => {
    console.log(`Exporting report in ${format} format`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Attendance Reports</h1>
        <div className="flex gap-2">
          <Button onClick={() => handleExport('excel')} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Excel
          </Button>
          <Button onClick={() => handleExport('pdf')} variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <StatCards />
      
      <ReportFilters filters={filters} setFilters={setFilters} />
      
      <Card className="p-6">
        <div className="text-center text-gray-500 py-8">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Configure your filters and generate reports</p>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
