
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Check, Clock, Upload, User, X } from "lucide-react";

const Attendance = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [recognized, setRecognized] = useState(false);
  const [employee, setEmployee] = useState<any>(null);
  const [tab, setTab] = useState("checkin");
  const [method, setMethod] = useState("face");
  
  // Mock data of employees
  const employees = [
    { id: 1, name: "John Smith", projectId: "PRO-001", role: "Worker", image: null },
    { id: 2, name: "Sarah Johnson", projectId: "PRO-002", role: "Supervisor", image: null },
    { id: 3, name: "Robert Williams", projectId: "PRO-003", role: "Worker", image: null },
    { id: 4, name: "Emily Davis", projectId: "PRO-004", role: "Worker", image: null },
    { id: 5, name: "James Miller", projectId: "PRO-005", role: "Worker", image: null },
  ];
  
  // Mock projects
  const projects = [
    { id: 1, name: "Main Building Construction" },
    { id: 2, name: "Bridge Expansion Project" },
    { id: 3, name: "Highway Renovation" },
  ];
  
  const activateCamera = () => {
    setCameraActive(true);
    setCaptured(false);
    setRecognized(false);
    setEmployee(null);
  };
  
  const captureImage = () => {
    setCaptured(true);
    // Simulate face recognition after 2 seconds
    setTimeout(() => {
      setRecognized(true);
      setEmployee(employees[Math.floor(Math.random() * employees.length)]);
    }, 2000);
  };
  
  const resetCamera = () => {
    setCameraActive(false);
    setCaptured(false);
    setRecognized(false);
    setEmployee(null);
  };
  
  const markAttendance = () => {
    // In a real app, this would send data to server
    alert(`Attendance marked for ${employee.name} via ${method} ${tab}`);
    resetCamera();
  };

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
                <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setMethod("face")}
                    className={`flex-1 py-3 px-4 rounded-md font-medium text-base flex items-center justify-center transition-all ${
                      method === "face" 
                        ? "bg-white shadow-md text-proscape" 
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Face Recognition
                  </button>
                  <button
                    onClick={() => setMethod("manual")}
                    className={`flex-1 py-3 px-4 rounded-md font-medium text-base flex items-center justify-center transition-all ${
                      method === "manual" 
                        ? "bg-white shadow-md text-proscape" 
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Manual Check In
                  </button>
                </div>
                
                {method === "face" ? (
                  <div className="text-center">
                    {!cameraActive ? (
                      <div className="p-10 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors shadow-inner">
                        <div className="bg-proscape/10 p-6 rounded-full inline-flex items-center justify-center mb-2">
                          <Camera className="h-20 w-20 text-proscape" />
                        </div>
                        <h3 className="mt-6 text-2xl font-semibold text-gray-900">Facial Recognition</h3>
                        <p className="mt-3 text-base text-gray-600 max-w-md mx-auto">
                          Capture employee's face for secure and quick check-in
                        </p>
                        <div className="mt-8">
                          <button
                            onClick={activateCamera}
                            className="bg-proscape hover:bg-proscape-dark text-white px-6 py-3 rounded-lg text-base font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                          >
                            Activate Camera
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="bg-black rounded-xl overflow-hidden aspect-video relative border-4 border-proscape/20 shadow-xl">
                          {!captured ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <div className="w-72 h-72 border-4 border-white rounded-full opacity-70 shadow-lg animate-pulse"></div>
                              <p className="text-white mt-6 font-semibold text-lg bg-black/40 px-4 py-2 rounded-full">Position face within the circle</p>
                            </div>
                          ) : recognized ? (
                            <div className="absolute inset-0 bg-green-500 bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                              <div className="bg-white p-8 rounded-xl shadow-2xl text-center transform animate-fade-in">
                                <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto border-4 border-green-200">
                                  <Check className="h-12 w-12 text-green-600" />
                                </div>
                                <h3 className="mt-4 text-2xl font-bold text-gray-800">{employee?.name}</h3>
                                <p className="text-lg text-gray-500 mt-1">{employee?.projectId}</p>
                                <p className="text-lg text-gray-500 mt-1 bg-proscape/10 rounded-full py-1 px-4 inline-block">{employee?.role}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
                              <div className="text-center">
                                <div className="h-20 w-20 rounded-full border-4 border-white border-t-transparent animate-spin mx-auto"></div>
                                <p className="text-white mt-6 text-lg font-medium bg-black/40 px-4 py-2 rounded-full">Analyzing face...</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-8 flex justify-center space-x-6">
                          {!captured ? (
                            <>
                              <button
                                onClick={resetCamera}
                                className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-50 transition-all"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={captureImage}
                                className="bg-proscape hover:bg-proscape-dark text-white px-6 py-3 rounded-lg text-base font-medium transition-all shadow-md hover:shadow-lg"
                              >
                                Capture Photo
                              </button>
                            </>
                          ) : !recognized ? (
                            <button
                              onClick={resetCamera}
                              className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-50 transition-all"
                            >
                              Cancel
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={resetCamera}
                                className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-50 transition-all"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={markAttendance}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-base font-medium transition-all shadow-md hover:shadow-lg flex items-center"
                              >
                                <Check className="mr-2 h-5 w-5" />
                                Confirm Check In
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Manual Check In</h3>
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
                )}
              </div>
              
              <div className="w-full lg:w-1/2">
                <div className="border rounded-xl p-0 overflow-hidden shadow-md bg-white">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800 text-lg">Today's Check Ins</h3>
                  </div>
                  <div className="p-6">
                    <div className="relative overflow-x-auto rounded-lg shadow-sm border border-gray-100">
                      <table className="w-full text-base text-left text-gray-600">
                        <thead className="text-sm font-medium text-gray-700 bg-gray-50 border-b">
                          <tr>
                            <th scope="col" className="px-6 py-4">Employee</th>
                            <th scope="col" className="px-6 py-4">Time</th>
                            <th scope="col" className="px-6 py-4">Method</th>
                            <th scope="col" className="px-6 py-4">Project</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium">John Smith</td>
                            <td className="px-6 py-4">08:32 AM</td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Face</span>
                            </td>
                            <td className="px-6 py-4">Main Building</td>
                          </tr>
                          <tr className="border-b hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium">Sarah Johnson</td>
                            <td className="px-6 py-4">08:45 AM</td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Face</span>
                            </td>
                            <td className="px-6 py-4">Bridge Expansion</td>
                          </tr>
                          <tr className="border-b hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium">Robert Williams</td>
                            <td className="px-6 py-4">09:15 AM</td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">Manual</span>
                            </td>
                            <td className="px-6 py-4">Highway Renovation</td>
                          </tr>
                          <tr className="border-b hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium">Emily Davis</td>
                            <td className="px-6 py-4">09:22 AM</td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Face</span>
                            </td>
                            <td className="px-6 py-4">Main Building</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium">James Miller</td>
                            <td className="px-6 py-4">09:30 AM</td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Face</span>
                            </td>
                            <td className="px-6 py-4">Highway Renovation</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="checkout" className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/2">
                <div className="flex mb-6">
                  <button
                    onClick={() => setMethod("face")}
                    className={`flex-1 py-2 border-b-2 font-medium text-sm ${
                      method === "face" 
                        ? "border-proscape text-proscape" 
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Camera className="h-4 w-4 inline mr-2" />
                    Face Recognition
                  </button>
                  <button
                    onClick={() => setMethod("manual")}
                    className={`flex-1 py-2 border-b-2 font-medium text-sm ${
                      method === "manual" 
                        ? "border-proscape text-proscape" 
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <User className="h-4 w-4 inline mr-2" />
                    Manual Check Out
                  </button>
                </div>
                
                {method === "face" ? (
                  <div className="text-center">
                    {!cameraActive ? (
                      <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <Camera className="h-16 w-16 mx-auto text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">Facial Recognition</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Capture employee's face to check out
                        </p>
                        <div className="mt-6">
                          <button
                            onClick={activateCamera}
                            className="bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                          >
                            Activate Camera
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="bg-black rounded-lg overflow-hidden aspect-video relative">
                          {!captured ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <div className="w-64 h-64 border-4 border-white rounded-full opacity-50"></div>
                              <p className="text-white mt-4">Position face within the circle</p>
                            </div>
                          ) : recognized ? (
                            <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
                              <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                                  <Check className="h-10 w-10 text-green-600" />
                                </div>
                                <h3 className="mt-2 text-lg font-bold">{employee?.name}</h3>
                                <p className="text-sm text-gray-500">{employee?.projectId}</p>
                                <p className="text-sm text-gray-500">{employee?.role}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="animate-pulse">
                                <div className="h-16 w-16 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
                              </div>
                              <p className="text-white absolute mt-24">Analyzing face...</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 flex justify-center space-x-4">
                          {!captured ? (
                            <>
                              <button
                                onClick={resetCamera}
                                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={captureImage}
                                className="bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded-md text-sm font-medium"
                              >
                                Capture
                              </button>
                            </>
                          ) : !recognized ? (
                            <button
                              onClick={resetCamera}
                              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={resetCamera}
                                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={markAttendance}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                              >
                                Confirm Check Out
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Manual Check Out</h3>
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
                )}
              </div>
              
              <div className="w-full lg:w-1/2">
                <div className="border rounded-lg p-0 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-medium text-gray-700">Today's Check Outs</h3>
                  </div>
                  <div className="p-4">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-3">Employee</th>
                            <th scope="col" className="px-4 py-3">Time</th>
                            <th scope="col" className="px-4 py-3">Method</th>
                            <th scope="col" className="px-4 py-3">Project</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="px-4 py-3">Emily Davis</td>
                            <td className="px-4 py-3">04:15 PM</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Face</span>
                            </td>
                            <td className="px-4 py-3">Main Building</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3">James Miller</td>
                            <td className="px-4 py-3">04:30 PM</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Face</span>
                            </td>
                            <td className="px-4 py-3">Highway Renovation</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3">Robert Williams</td>
                            <td className="px-4 py-3">05:05 PM</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">Manual</span>
                            </td>
                            <td className="px-4 py-3">Highway Renovation</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
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
                            <button className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs">
                              <Camera className="h-3 w-3 inline mr-1" />
                              Face
                            </button>
                            <button className="bg-amber-500 hover:bg-amber-600 text-white px-2 py-1 rounded text-xs">
                              <Clock className="h-3 w-3 inline mr-1" />
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
                            <button className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs">
                              <Camera className="h-3 w-3 inline mr-1" />
                              Face
                            </button>
                            <button className="bg-amber-500 hover:bg-amber-600 text-white px-2 py-1 rounded text-xs">
                              <Clock className="h-3 w-3 inline mr-1" />
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
