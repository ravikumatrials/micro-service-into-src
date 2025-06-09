
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import ManualAttendanceRecords from './pages/ManualAttendance'
import AttendanceHistory from './pages/AttendanceHistory'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/manual-attendance" replace />} />
            <Route path="/manual-attendance" element={<ManualAttendanceRecords />} />
            <Route path="/attendance-history" element={<AttendanceHistory />} />
          </Routes>
        </Layout>
        <Toaster />
      </div>
    </Router>
  )
}

export default App
