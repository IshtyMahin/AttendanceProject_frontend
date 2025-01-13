import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import Loading from "../components/Loading";

function AttendanceReportPage() {
  const [departments, setDepartments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [semesters] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [attendanceReports, setAttendanceReports] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [loadingReports, setLoadingReports] = useState(false);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setError(""); 
    axios
      .get("https://attendanceproject-backend.onrender.com/api/departments")
      .then((response) => setDepartments(response.data))
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch departments. Please try again.");
      });
  }, []);

  useEffect(() => {
    setSessions([]);
    if (selectedDepartment) {
      setLoadingSessions(true);
      setError(""); 
      axios
        .get(
          `https://attendanceproject-backend.onrender.com/api/sessions?departmentId=${selectedDepartment}`
        )
        .then((response) => setSessions(response.data))
        .catch((error) => {
          console.error(error);
          setError("Failed to fetch sessions. Please try again.");
        })
        .finally(() => setLoadingSessions(false));
    }
  }, [selectedDepartment]);

  const fetchAttendanceReports = () => {
    if (!selectedDepartment || !selectedSession || !selectedSemester) {
      setError(
        "Please select all fields before fetching the attendance report."
      );
      return;
    }

    setLoadingReports(true);
    setError(""); 
    axios
      .get(
        `https://attendanceproject-backend.onrender.com/api/attendance/all-students?departmentId=${selectedDepartment}&sessionId=${selectedSession}&semesterNumber=${selectedSemester}`
      )
      .then((response) => {
        setAttendanceReports(response.data);
        setAlert({
          type: "success",
          message: "Attendance data fetched successfully!",
        });
      })
      .catch((error) => {
        console.error(error);
        setAlert({
          type: "error",
          message: "Failed to fetch attendance reports. Please try again.",
        });
      })
      .finally(() => setLoadingReports(false));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        📊 Attendance Report
      </h1>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      {error && (
        <Alert type="error" message={error} onClose={() => setError("")} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Department
          </label>
          <select
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full p-2 border rounded focus:ring"
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Session
          </label>
          <select
            onChange={(e) => setSelectedSession(e.target.value)}
            value={selectedSession}
            className="w-full p-2 border rounded focus:ring"
            disabled={loadingSessions || sessions.length === 0}
          >
            <option value="">Select Session</option>
            {sessions.map((session) => (
              <option key={session._id} value={session._id}>
                {session.year}
              </option>
            ))}
          </select>
          {loadingSessions && <Loading />}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Semester
          </label>
          <select
            onChange={(e) => setSelectedSemester(e.target.value)}
            value={selectedSemester}
            className="w-full p-2 border rounded focus:ring"
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={fetchAttendanceReports}
        className="w-full bg-slate-700 text-white py-3 rounded hover:bg-slate-800 transition font-semibold text-lg mb-6"
        disabled={loadingReports}
      >
        {loadingReports ? "Fetching Attendance..." : "Fetch Attendance"}
      </button>

      {loadingReports && <Loading />}

      {!loadingReports && attendanceReports.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-slate-800 border-b-2 border-b-slate-500 text-white">
              <tr>
                <th className="p-4 text-left">Student ID</th>
                <th className="p-4 text-left">Course</th>
                <th className="p-4 text-center">Total Classes</th>
                <th className="p-4 text-center">Attended</th>
                <th className="p-4 text-center">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {attendanceReports.map((report) => (
                <>
                  {report.details.map((detail, index) => (
                    <tr
                      key={`${report.studentId}-${detail.course}`}
                      className={`border-b hover:bg-gray-100 ${
                        index % 2 === 0 ? "bg-gray-50" : ""
                      }`}
                    >
                      {index === 0 && (
                        <td
                          className="p-4 font-semibold text-white bg-slate-800"
                          rowSpan={report.details.length + 1}
                        >
                          {report.studentId}
                        </td>
                      )}
                      <td className="p-4">{detail.course}</td>
                      <td className="p-4 text-center">{detail.totalClasses}</td>
                      <td className="p-4 text-center">
                        {detail.attendedClasses}
                      </td>
                      <td className="p-4 text-center font-bold">
                        {detail.percentage}%
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t bg-gray-200 text-center border-b-2 border-b-slate-500">
                    <td
                      colSpan={3}
                      className="p-4 font-semibold text-gray-700 text-right"
                    >
                      Overall Average:
                    </td>
                    <td
                      className={`p-4 text-center font-bold ${
                        report.overallAverage >= 75
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {report.overallAverage}%
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loadingReports && attendanceReports.length === 0 && !error && (
        <div className="text-center text-gray-500">
          No attendance data available.
        </div>
      )}
    </div>
  );
}

export default AttendanceReportPage;
