
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  CheckCircle, 
  Clock, 
  Package, 
  Upload,
  Folder,
  FileText,
  RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  // Mock data for dashboard - removed absent, pending checkouts
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
    }
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
          // Format current date and time for display
          const now = new Date();
          const formattedDate = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });
          const formattedTime = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
          const syncTimestamp = `${formattedDate} ${formattedTime}`;
          setLastSyncTime(syncTimestamp);
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
        
        {/* Quick Actions Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h2 className="text-sm font-medium text-gray-500 mb-3">QUICK ACTIONS</h2>
          <div className="grid grid-cols-5 gap-4">
            {quickActions.map((action, index) => (
              <div key={index} className="flex flex-col">
                <Button
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
                {action.label === "Sync Data" && lastSyncTime && (
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    Last Synced: {lastSyncTime}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
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
    </div>
  );
};

export default Dashboard;
