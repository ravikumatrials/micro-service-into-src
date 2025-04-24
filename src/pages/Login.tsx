
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simulate authentication
    if (
      credentials.email === "admin@proscape.com" &&
      credentials.password === "123456"
    ) {
      toast.success("Login successful!");
      navigate("/");
    } else {
      setError("Invalid email or password");
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-lg animate-fade-in">
        <div className="flex flex-col items-center space-y-4">
          <img
            src="/lovable-uploads/a0d8ed56-0cf0-440c-8865-50cfc30ca8a0.png"
            alt="Proscape Logo"
            className="h-12 w-12"
          />
          <h2 className="text-2xl font-bold text-gray-900">
            Proscape Facial Attendance System
          </h2>
          <p className="text-sm text-gray-600">
            Sign in to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  className="text-sm text-proscape hover:text-proscape-dark"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="mt-1"
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 animate-fade-in">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full bg-proscape hover:bg-proscape-dark text-white"
            >
              Sign in
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            &copy; 2025 Proscape Construction Company
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
