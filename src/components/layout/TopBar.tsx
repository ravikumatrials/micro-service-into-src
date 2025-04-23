
import { useState } from "react";
import { User, Search, LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function TopBar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Theme toggle handler
  const handleThemeToggle = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex-shrink-0">
                <h1 className="text-lg sm:text-xl font-bold text-proscape dark:text-proscape-light">Proscape Facial Attendance System</h1>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-proscape focus:ring-1 focus:ring-proscape sm:text-sm dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Theme toggle (dark/light) and user profile */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              aria-label="Toggle theme"
              onClick={handleThemeToggle}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none transition"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-proscape flex items-center justify-center text-white">
                  <User className="h-5 w-5" />
                </div>
              </button>
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Your Profile</a>
                  <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</a>
                  <div className="border-t border-gray-200 dark:border-gray-700"></div>
                  <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
