
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
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-gray-800">Attendance</h1>
        <button className="bg-proscape hover:bg-proscape-dark text-white px-6 py-3 rounded-2xl text-lg font-semibold transition-colors flex items-center shadow-lg animate-fade-in">
          <Upload className="h-6 w-6 mr-2" />
          Sync Offline Data
        </button>
      </div>

      <Card className="p-0 overflow-hidden shadow-2xl border-0">
        <Tabs defaultValue="checkin" className="w-full" onValueChange={setTab}>
          <div className="flex justify-center px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-proscape/10 to-proscape/5">
            <TabsList className="grid w-[450px] rounded-xl grid-cols-3 mx-auto bg-white/90 p-2 shadow-lg">
              <TabsTrigger value="checkin" className="text-xl py-4 rounded-xl">
                Check In
              </TabsTrigger>
              <TabsTrigger value="checkout" className="text-xl py-4 rounded-xl">
                Check Out
              </TabsTrigger>
              <TabsTrigger value="exception" className="text-xl py-4 rounded-xl">
                Exceptions
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="checkin" className="p-10">
            <div className="flex flex-col items-center justify-center">
              <ManualCheckInForm projects={projects} />
            </div>
          </TabsContent>
          <TabsContent value="checkout" className="p-10">
            <div className="flex flex-col items-center justify-center">
              <ManualCheckOutForm projects={projects} />
            </div>
          </TabsContent>
          <TabsContent value="exception" className="p-10">
            <ExceptionTables />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Attendance;
