
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import ManualAttendance from './pages/ManualAttendance';
import AttendanceHistory from './pages/AttendanceHistory';

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/manual-attendance" replace />} />
            <Route path="/manual-attendance" element={<ManualAttendance />} />
            <Route path="/attendance-history" element={<AttendanceHistory />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
