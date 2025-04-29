import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, CheckCircle, AlertTriangle, Clock, FileText, PenSquare } from "lucide-react";

const Dashboard = () => {
  // Mock data for dashboard
  const stats = [
    { 
      title: "Total Employees", 
      count: "6,247", 
      icon: <Users className="h-8 w-8 text-proscape" />,
      change: "+12% from last month"
    },
    { 
      title: "Present Today", 
      count: "4,893", 
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
      change: "78% attendance rate"
    },
    { 
      title: "Absent Today", 
      count: "1,354", 
      icon: <AlertTriangle className="h-8 w-8 text-amber-500" />,
      change: "22% absence rate"
    },
    { 
      title: "Pending Check-outs", 
      count: "246", 
      icon: <Clock className="h-8 w-8 text-red-500" />,
      change: "4% of present employees"
    }
  ];

  const recentActivity = [
    { id: 1, employee: "Sarah Johnson", action: "Check-in (Face)", time: "08:45 AM", location: "Main Site" },
    { id: 2, employee: "Robert Smith", action: "Check-out (Face)", time: "05:15 PM", location: "East Wing" },
    { id: 3, employee: "Emily Davis", action: "Check-in (Manual)", time: "09:10 AM", location: "North Site" },
    { id: 4, employee: "James Wilson", action: "Check-out (Manual)", time: "06:00 PM", location: "West Building" },
    { id: 5, employee: "David Taylor", action: "Check-in (Face)", time: "08:30 AM", location: "South Tower" }
  ];

  // Quick actions - Face Enrollment removed
  const quickActions = [
    { 
      label: "Mark Attendance", 
      icon: <CheckCircle className="h-5 w-5" />,
      onClick: () => console.log("Mark Attendance clicked")
    },
    { 
      label: "Manual Entry", 
      icon: <PenSquare className="h-5 w-5" />,
      onClick: () => console.log("Manual Entry clicked")
    },
    { 
      label: "Export Report", 
      icon: <FileText className="h-5 w-5" />,
      onClick: () => console.log("Export Report clicked")
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          
          <div className="flex items-center gap-3 px-4 min-w-0">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-gray-700 hover:text-proscape hover:border-proscape transition-colors whitespace-nowrap"
                onClick={action.onClick}
              >
                {action.icon}
                <span className="hidden sm:inline">{action.label}</span>
              </Button>
            ))}
          </div>

          <div className="flex justify-end">
            <Button 
              className="bg-proscape hover:bg-proscape-dark text-white"
            >
              Sync Data
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.count}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-full">
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
        <Card className="p-0 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3">Employee</th>
                    <th scope="col" className="px-4 py-3">Action</th>
                    <th scope="col" className="px-4 py-3">Time</th>
                    <th scope="col" className="px-4 py-3">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((activity) => (
                    <tr key={activity.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{activity.employee}</td>
                      <td className="px-4 py-3">
                        <span 
                          className={`px-2 py-1 rounded text-xs ${
                            activity.action.includes('Manual') 
                              ? 'bg-amber-100 text-amber-800' 
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {activity.action}
                        </span>
                      </td>
                      <td className="px-4 py-3">{activity.time}</td>
                      <td className="px-4 py-3">{activity.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pt-4 flex justify-center">
              <button className="text-sm text-proscape hover:text-proscape-dark">
                View All Activity
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
