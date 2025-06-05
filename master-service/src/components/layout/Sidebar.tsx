
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Users, 
  Folder, 
  UserCheck, 
  Settings, 
  ClipboardList,
  Menu,
  X,
  LayoutDashboard
} from "lucide-react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Folder, label: "Projects", path: "/projects" },
    { icon: Users, label: "Employees", path: "/employees" },
    { icon: UserCheck, label: "Roles", path: "/roles" },
    { icon: ClipboardList, label: "Attendance Types", path: "/attendance-type" },
    { icon: Settings, label: "Role Logic", path: "/role-attendance-logic" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-center h-16 bg-proscape">
          <h1 className="text-white text-xl font-bold">Master Service</h1>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-proscape transition-colors ${
                  isActive ? "bg-proscape/10 text-proscape border-r-4 border-proscape" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
