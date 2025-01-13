// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import AttendanceMarkingPage from "./pages1/AttendanceMarkingPage";
import SetupPage from "./pages1/SetupPage";
import AttendanceReportPage from "./pages1/AttendanceReportPage";


function App() {
  return (
    <Router>
      <Navbar />

      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<AttendanceMarkingPage />} />
          <Route path="/attendance-report" element={<AttendanceReportPage />} />
          {/* <Route path="/setup" element={<SetupPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
