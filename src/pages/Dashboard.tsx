
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  Users, 
  CheckCircle, 
  LogOut, 
  RefreshCw,
  UserCheck,
  Package,
  Upload,
  Folder,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dashboardData, setDashboardData] = useState({
    totalEmployees: "6,000",
    checkedInToday: "2,450",
    checkedOutToday: "1,870",
    faceEnrolled: "541 / 6,000"
  });

  // Update dashboard data when date changes
  useEffect(() => {
    // In a real application, this would be an API call that fetches data for the selected date
    const fetchDashboardData = () => {
      // Simulate API delay
      setTimeout(() => {
        // Simulate different data for different dates
        const day = selectedDate.getDate();
        const randomFactor = day % 5 + 0.8; // Creates variation based on day
        
        const totalEmp = 6000;
        const checkedIn = Math.round(2450 * randomFactor);
        const checkedOut = Math.round(1870 * randomFactor);
        const faceEnrolled = Math.round(541 * randomFactor);
        
        setDashboardData({
          totalEmployees: totalEmp.toLocaleString(),
          checkedInToday: checkedIn.toLocaleString(),
          checkedOutToday: checkedOut.toLocaleString(),
          faceEnrolled: `${faceEnrolled} / ${totalEmp.toLocaleString()}`
        });
      }, 300);
    };
    
    fetchDashboardData();
  }, [selectedDate]);

  // Dashboard cards
  const dashboardCards = [
    { 
      title: "Total Employees", 
      count: dashboardData.totalEmployees, 
      icon: <Users className="h-8 w-8 text-proscape" />
    },
    { 
      title: "Checked In Today", 
      count: dashboardData.checkedInToday, 
      icon: <CheckCircle className="h-8 w-8 text-green-500" />
    },
    { 
      title: "Checked Out Today", 
      count: dashboardData.checkedOutToday, 
      icon: <LogOut className="h-8 w-8 text-amber-500" />
    },
    { 
      title: "Face Enrolled", 
      count: dashboardData.faceEnrolled, 
      icon: <UserCheck className="h-8 w-8 text-blue-500" />
    }
  ];

  // Quick actions - keeping the existing ones
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
  
  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      toast.info(`Dashboard updated for ${format(date, 'dd MMM yyyy')}`);
      // Data is fetched via the useEffect hook when selectedDate changes
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        {/* Dashboard header with date picker */}
        <div className="flex flex-wrap items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          
          {/* Date Picker - Fixed implementation */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-gray-200 bg-white"
              >
                <Calendar className="h-4 w-4" />
                <span>
                  {format(selectedDate, "dd MMM yyyy")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Dashboard Cards - 2x2 Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 mb-6">
          {dashboardCards.map((card, index) => (
            <Card key={index} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{card.count}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-full">
                  {card.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Quick Actions Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
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
    </div>
  );
};

export default Dashboard;
