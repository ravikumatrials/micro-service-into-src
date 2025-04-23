
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from "lucide-react";
import ManualCheckInForm from "@/components/attendance/ManualCheckInForm";
import ManualCheckOutForm from "@/components/attendance/ManualCheckOutForm";
import ExceptionTables from "@/components/attendance/ExceptionTables";

const Attendance = () => {
  const [tab, setTab] = useState("checkin");

  // Mock projects
  const projects = [
    { id: 1, name: "Main Building Construction" },
    { id: 2, name: "Bridge Expansion Project" },
    { id: 3, name: "Highway Renovation" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Attendance</h1>
        <button className="bg-proscape hover:bg-proscape-dark text-white px-5 py-3 rounded-lg text-base font-medium transition-colors flex items-center shadow-md">
          <Upload className="h-5 w-5 mr-2" />
          Sync Offline Data
        </button>
      </div>

      <Card className="p-0 overflow-hidden shadow-lg border-0">
        <Tabs defaultValue="checkin" className="w-full" onValueChange={setTab}>
          <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-proscape/10 to-proscape/5">
            <TabsList className="grid w-full max-w-xl grid-cols-3 mx-auto bg-white/80 p-1 shadow-sm">
              <TabsTrigger value="checkin" className="text-base py-3">
                Check In
              </TabsTrigger>
              <TabsTrigger value="checkout" className="text-base py-3">
                Check Out
              </TabsTrigger>
              <TabsTrigger value="exception" className="text-base py-3">
                Exceptions
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="checkin" className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/2">
                <ManualCheckInForm projects={projects} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="checkout" className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/2">
                <ManualCheckOutForm projects={projects} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="exception" className="p-6">
            <ExceptionTables />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Attendance;

