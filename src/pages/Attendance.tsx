
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, User, Clock, Camera } from "lucide-react";

const Attendance = () => {
  const [tab, setTab] = useState("checkin");
  const [method, setMethod] = useState("manual");

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
        <Tabs defaultValue="checkin" className="w-full" onValueChange={(value) => setTab(value)}>
          <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-proscape/10 to-proscape/5">
            <TabsList className="grid w-full max-w-xl grid-cols-3 mx-auto bg-white/80 p-1 shadow-sm">
              <TabsTrigger value="checkin" className="text-base py-3">Check In</TabsTrigger>
              <TabsTrigger value="checkout" className="text-base py-3">Check Out</TabsTrigger>
              <TabsTrigger value="exception" className="text-base py-3">Exceptions</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="checkin" className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/2">
                <div className="border rounded-lg p-6 bg-white shadow-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-proscape" />
                    Manual Check In
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee ID or Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                        placeholder="Enter employee ID or name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape">
                        <option value="">Select project</option>
                        {projects.map(project => (
                          <option key={project.id} value={project.id}>{project.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Check In Time
                      </label>
                      <input
                        type="time"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reason for Manual Check In
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                        placeholder="Enter reason"
                        rows={4}
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Remove the "Today's Check Ins" table/section */}
            </div>
          </TabsContent>

          <TabsContent value="checkout" className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/2">
                <div className="border rounded-lg p-6 bg-white shadow-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-proscape" />
                    Manual Check Out
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee ID or Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                        placeholder="Enter employee ID or name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape">
                        <option value="">Select project</option>
                        {projects.map(project => (
                          <option key={project.id} value={project.id}>{project.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Check Out Time
                      </label>
                      <input
                        type="time"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reason for Manual Check Out
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                        placeholder="Enter reason"
                        rows={4}
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Remove any Face Recognition or right side sections */}
            </div>
          </TabsContent>

          <TabsContent value="exception" className="p-6">
            <div className="rounded-lg border p-0 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-medium text-gray-700">Pending Check Outs</h3>
                <p className="text-xs text-gray-500 mt-1">Employees who checked in but didn't check out</p>
              </div>
              <div className="p-4">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3">Employee</th>
                        <th scope="col" className="px-4 py-3">Check In Time</th>
                        <th scope="col" className="px-4 py-3">Project</th>
                        <th scope="col" className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-3">John Smith</td>
                        <td className="px-4 py-3">08:32 AM</td>
                        <td className="px-4 py-3">Main Building</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button className="bg-amber-500 hover:bg-amber-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                              <Clock className="h-3 w-3 inline" />
                              Manual
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3">Sarah Johnson</td>
                        <td className="px-4 py-3">08:45 AM</td>
                        <td className="px-4 py-3">Bridge Expansion</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button className="bg-amber-500 hover:bg-amber-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                              <Clock className="h-3 w-3 inline" />
                              Manual
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-lg border p-0 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-medium text-gray-700">Missed Check Ins</h3>
                <p className="text-xs text-gray-500 mt-1">Employees who checked out but didn't check in</p>
              </div>
              <div className="p-4">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3">Employee</th>
                        <th scope="col" className="px-4 py-3">Check Out Time</th>
                        <th scope="col" className="px-4 py-3">Project</th>
                        <th scope="col" className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                          No missed check-ins found
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Attendance;
