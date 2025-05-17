
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Employees = () => {
  // Automatically redirect to All Employees view
  return <Navigate to="/master/employees/all" replace />;
};

export default Employees;
