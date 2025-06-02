
import { Routes, Route } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

export const CoreRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
    </Routes>
  );
};
