
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Edit, User, Lock, Camera, Save, X, Eye, EyeOff } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: "Michael Brown",
    employeeId: "EMP007",
    role: "Super Admin",
    email: "michael.brown@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    department: "Administration",
    joiningDate: "01/01/2023",
    profileImage: null // In a real app, this would be a URL
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isChangingPassword) {
      setIsChangingPassword(false);
    }
  };
  
  const handlePasswordChangeToggle = () => {
    setIsChangingPassword(!isChangingPassword);
    if (isEditing) {
      setIsEditing(false);
    }
  };
  
  const handleSaveProfile = () => {
    // In a real app, this would save to the database
    setIsEditing(false);
    alert("Profile updated successfully");
  };
  
  const handleSavePassword = () => {
    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    
    // In a real app, this would verify the current password and save the new one
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    alert("Password changed successfully");
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {userData.profileImage ? (
                  <img 
                    src={userData.profileImage} 
                    alt={userData.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-16 w-16 text-gray-400" />
                )}
              </div>
              
              <h2 className="mt-4 text-xl font-bold text-gray-900">{userData.name}</h2>
              <p className="text-gray-500">{userData.employeeId}</p>
              
              <div className="mt-2">
                <span className="inline-flex items-center bg-proscape-lighter text-proscape text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {userData.role}
                </span>
              </div>
              
              <div className="mt-6 w-full space-y-3">
                <button 
                  onClick={handleEditToggle}
                  className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium ${
                    isEditing 
                      ? "bg-gray-200 text-gray-800" 
                      : "bg-proscape text-white hover:bg-proscape-dark"
                  }`}
                >
                  {isEditing ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Cancel Editing
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </button>
                
                <button 
                  onClick={handlePasswordChangeToggle}
                  className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium ${
                    isChangingPassword 
                      ? "bg-gray-200 text-gray-800" 
                      : "border border-proscape text-proscape hover:bg-proscape-lighter"
                  }`}
                >
                  {isChangingPassword ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </>
                  )}
                </button>
              </div>
            </div>
          </Card>

          <Card className="mt-6 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">System Access</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Role</h4>
                <p className="text-sm text-gray-900">{userData.role}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700">Permissions</h4>
                <div className="mt-1 space-y-1">
                  <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded inline-block mr-1 mb-1">Self Attendance</div>
                  <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded inline-block mr-1 mb-1">Mark Attendance</div>
                  <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded inline-block mr-1 mb-1">View Reports</div>
                  <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded inline-block mr-1 mb-1">Manage Employees</div>
                  <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded inline-block mr-1 mb-1">Manage Roles</div>
                  <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded inline-block mr-1 mb-1">Manage Projects</div>
                  <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded inline-block mr-1 mb-1">Manage Locations</div>
                  <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded inline-block mr-1 mb-1">Export Data</div>
                  <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded inline-block mr-1 mb-1">System Settings</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700">Last Login</h4>
                <p className="text-sm text-gray-900">22 Apr 2025, 08:15 AM</p>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          {!isChangingPassword ? (
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                {isEditing && (
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                      value={userData.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-gray-900">{userData.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID
                  </label>
                  <p className="text-gray-900">{userData.employeeId}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                      value={userData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-gray-900">{userData.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                      value={userData.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-gray-900">{userData.phone}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                      value={userData.address}
                      onChange={handleInputChange}
                    ></textarea>
                  ) : (
                    <p className="text-gray-900">{userData.address}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  {isEditing ? (
                    <select
                      name="department"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                      value={userData.department}
                      onChange={handleInputChange}
                    >
                      <option value="Administration">Administration</option>
                      <option value="Construction">Construction</option>
                      <option value="Engineering">Engineering</option>
                      <option value="HR">HR</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{userData.department}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Joining Date
                  </label>
                  <p className="text-gray-900">{userData.joiningDate}</p>
                </div>
              </div>
              
              {isEditing && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Photo
                  </label>
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                      {userData.profileImage ? (
                        <img 
                          src={userData.profileImage} 
                          alt={userData.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <button className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium">
                        <Camera className="h-4 w-4 mr-2" />
                        Upload Photo
                      </button>
                      <p className="mt-1 text-xs text-gray-500">JPG or PNG. Max size 2MB</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ) : (
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
                <button
                  onClick={handleSavePassword}
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Password
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="currentPassword"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape pr-10"
                      placeholder="Enter current password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape pr-10"
                      placeholder="Enter new password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Password must be at least 8 characters long and include numbers and special characters
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape pr-10"
                      placeholder="Confirm new password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {passwordData.newPassword && passwordData.confirmPassword && 
                   passwordData.newPassword !== passwordData.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      Passwords do not match
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-8 border-t pt-6">
                <h3 className="text-md font-medium text-gray-900 mb-3">Password Security Tips</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li>Use a minimum of 8 characters</li>
                  <li>Include at least one uppercase letter</li>
                  <li>Include at least one number</li>
                  <li>Include at least one special character (e.g., !@#$%)</li>
                  <li>Don't reuse passwords from other websites</li>
                  <li>Avoid using personal information in your password</li>
                </ul>
              </div>
            </Card>
          )}

          <Card className="mt-6 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Lock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Password Changed</p>
                  <p className="text-sm text-gray-500">15 Apr 2025, 10:30 AM</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Edit className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Profile Updated</p>
                  <p className="text-sm text-gray-500">10 Apr 2025, 2:15 PM</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <Camera className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Photo Updated</p>
                  <p className="text-sm text-gray-500">05 Apr 2025, 9:45 AM</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
