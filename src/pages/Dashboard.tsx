
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Package, 
  Upload,
  Folder,
  FileText,
  RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();

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

  // New quick actions
  const quickActions = [
    { 
      label: "Bulk Attendance", 
      icon: <Package className="h-5 w-5" />,
      onClick: () => navigate("/bulk-attendance"),
      description: "Mark attendance for multiple employees"
    },
    { 
      label: "Import Employees", 
      icon: <Upload className="h-5 w-5" />,
      onClick: () => navigate("/master/employees"),
      description: "Import employee list via Tanseeq API or Excel"
    },
    { 
      label: "View Projects", 
      icon: <Folder className="h-5 w-5" />,
      onClick: () => navigate("/master/projects"),
      description: "Navigate directly to the Projects submenu"
    },
    { 
      label: "Attendance Reports", 
      icon: <FileText className="h-5 w-5" />,
      onClick: () => navigate("/reports"),
      description: "View and export attendance history and records"
    },
    { 
      label: "Sync Data", 
      icon: <RefreshCw className="h-5 w-5" />,
      onClick: () => {
        toast.info("Syncing data...", { duration: 2000 });
        setTimeout(() => {
          toast.success("Data synchronized successfully!");
        }, 2000);
      },
      description: "Initiates data sync with central database"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
        
        {/* New Quick Actions Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h2 className="text-sm font-medium text-gray-500 mb-3">QUICK ACTIONS</h2>
          <div className="grid grid-cols-5 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="flex flex-col items-center gap-2 p-4 h-auto border-gray-200 hover:bg-proscape/5 hover:border-proscape hover:shadow-sm transition-all"
                onClick={action.onClick}
                title={action.description}
              >
                <div className="w-10 h-10 rounded-full bg-proscape/10 flex items-center justify-center text-proscape">
                  {action.icon}
                </div>
                <span className="font-medium text-sm">{action.label}</span>
              </Button>
            ))}
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
