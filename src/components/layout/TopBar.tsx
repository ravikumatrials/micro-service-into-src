
import { useState, useEffect } from "react";
import { User, Search, LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function TopBar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // --- NEW: Persist theme in localStorage manually for SPA behavior ---
  useEffect(() => {
    setMounted(true);
    // If theme is stored in localStorage, set it on mount
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme);
    }
  }, [setTheme]);

  // Whenever theme changes, persist it
  useEffect(() => {
    if (theme) {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    // resolvedTheme is what is currently active
    window.localStorage.setItem("theme", resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <header className="bg-background border-b border-border z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex-shrink-0">
                  <h1 className="text-lg sm:text-xl font-bold text-heading">Proscape Facial Attendance System</h1>
                </div>
                <div className="hidden md:block ml-10">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-secondary" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search..."
                        className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-secondary-bg placeholder-secondary focus:outline-none focus:placeholder-secondary focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm dark:bg-card dark:text-foreground transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* THEME TOGGLE BUTTON, Always visible, responsive */}
              <button
                aria-label="Toggle theme"
                onClick={handleThemeToggle}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary-bg dark:bg-card border border-border hover:bg-accent dark:hover:bg-accent transition shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-5 w-5 text-primary" />
                ) : (
                  <Moon className="h-5 w-5 text-primary" />
                )}
              </button>

              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-border transition duration-150 ease-in-out"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-proscape flex items-center justify-center text-white">
                    <User className="h-5 w-5" />
                  </div>
                </button>
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-background border border-border ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <a href="/profile" className="block px-4 py-2 text-sm text-foreground hover:bg-accent/50">Your Profile</a>
                    <a href="/settings" className="block px-4 py-2 text-sm text-foreground hover:bg-accent/50">Settings</a>
                    <div className="border-t border-border"></div>
                    <button className="flex w-full items-center px-4 py-2 text-sm text-foreground hover:bg-accent/50">
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

  return (
    <header className="bg-background border-b border-border z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex-shrink-0">
                <h1 className="text-lg sm:text-xl font-bold text-heading">Proscape Facial Attendance System</h1>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-secondary" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-secondary-bg placeholder-secondary text-foreground focus:outline-none focus:placeholder-secondary focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm dark:bg-card dark:text-foreground transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* THEME TOGGLE BUTTON, Always visible, responsive */}
            <button
              aria-label="Toggle theme"
              onClick={handleThemeToggle}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary-bg dark:bg-card border border-border hover:bg-accent dark:hover:bg-accent transition shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5 text-primary" />
              ) : (
                <Moon className="h-5 w-5 text-primary" />
              )}
            </button>
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-border transition duration-150 ease-in-out"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-proscape flex items-center justify-center text-white">
                  <User className="h-5 w-5" />
                </div>
              </button>
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-background border border-border ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <a href="/profile" className="block px-4 py-2 text-sm text-foreground hover:bg-accent/50">Your Profile</a>
                  <a href="/settings" className="block px-4 py-2 text-sm text-foreground hover:bg-accent/50">Settings</a>
                  <div className="border-t border-border"></div>
                  <button className="flex w-full items-center px-4 py-2 text-sm text-foreground hover:bg-accent/50">
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
