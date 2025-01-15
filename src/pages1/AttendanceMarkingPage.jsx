import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import Loading from "../components/Loading";

function AttendanceMarkingPage() {
  const [departments, setDepartments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [semesters] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [courses, setCourses] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), 3000);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://attendanceproject-backend.onrender.com/api/departments")
      .then((response) => setDepartments(response.data))
      .catch(() => showAlert("error", "Failed to load departments!"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setSessions([]);
    setSelectedSession("");
    if (selectedDepartment) {
      setLoading(true);
      axios
        .get(
          `https://attendanceproject-backend.onrender.com/api/sessions?departmentId=${selectedDepartment}`
        )
        .then((response) => setSessions(response.data))
        .catch(() => showAlert("error", "Failed to load sessions!"))
        .finally(() => setLoading(false));
    }
  }, [selectedDepartment]);

  useEffect(() => {
    setCourses([]);
    setSelectedCourse("");
    if (selectedDepartment && selectedSession && selectedSemester) {
      setLoading(true);
      axios
        .get(
          `https://attendanceproject-backend.onrender.com/api/courses?year=${selectedSession}&departmentId=${selectedDepartment}&semesterNumber=${selectedSemester}`
        )
        .then((response) => setCourses(response.data))
        .catch(() => showAlert("error", "Failed to load courses!"))
        .finally(() => setLoading(false));
    }
  }, [selectedSession, selectedDepartment, selectedSemester]);

  const fetchStudents = () => {
    if (!selectedDepartment || !selectedSession) {
      showAlert("error", "Please select department and session first!");
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://attendanceproject-backend.onrender.com/api/students?departmentId=${selectedDepartment}&sessionId=${selectedSession}`
      )
      .then((response) => setStudents(response.data))
      .catch(() => showAlert("error", "Failed to load students!"))
      .finally(() => setLoading(false));
  };

  const handleAttendanceSubmit = () => {
    if (!selectedCourse) {
      showAlert("error", "Please select a course!");
      return;
    }

    if (!attendanceDate) {
      showAlert("error", "Please select a valid date!");
      return;
    }

    if (students.length === 0) {
      showAlert("error", "No students found for this department and session!");
      return;
    }

    const attendanceDataArray = students.map((student) => ({
      student: student._id,
      course: selectedCourse,
      date: attendanceDate,
      status: attendanceData[student._id] ? "Present" : "Absent",
    }));

    setLoading(true);
    axios
      .post("https://attendanceproject-backend.onrender.com/api/attendance", attendanceDataArray)
      .then(() => {
        showAlert("success", "Attendance marked successfully!");
        setAttendanceData({});
        setAttendanceDate(new Date().toISOString().split("T")[0]);
      })
      .catch(() => showAlert("error", "Failed to mark attendance!"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-100 min-h-screen shadow-md rounded-lg">
      {alert.message && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ type: "", message: "" })}
        />
      )}

      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        🎓 Mark Attendance
      </h1>

      {loading && <Loading />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-lg font-medium mb-2 text-gray-700">
            Department
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium mb-2 text-gray-700">
            Session
          </label>
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Session</option>
            {sessions.map((session) => (
              <option key={session._id} value={session._id}>
                {session.year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={fetchStudents}
        className="w-full mb-8 bg-slate-800 text-white py-3  hover:bg-slate-900 rounded-lg font-medium  transition"
      >
        Fetch Students
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-lg font-medium mb-2 text-gray-700">
            Semester
          </label>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium mb-2 text-gray-700">
            Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <label className="block text-lg font-medium mb-2 text-gray-700">
            Attendance Date
          </label>
          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="mt-8">
        {students.length === 0 ? (
          <div className="text-center text-gray-500">No students found</div>
        ) : (
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
            <thead className="bg-slate-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-lg font-bold">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-lg font-bold">
                  Student Name
                </th>
                <th className="px-6 py-3 text-center text-lg font-bold">
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student._id}
                  onClick={() =>
                    setAttendanceData({
                      ...attendanceData,
                      [student._id]: !attendanceData[student._id],
                    })
                  }
                  className={`border-t border-gray-200 transition-all cursor-pointer ${
                    attendanceData[student._id]
                      ? "bg-green-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <td className="px-6 py-4 text-left">{student.studentId}</td>
                  <td className="px-6 py-4 text-left">{student.name}</td>
                  <td className="px-6 py-4 text-center">
                    <label
                      className="relative inline-flex items-center cursor-pointer"
                      onClick={(e) => e.stopPropagation()} // ✅ Stop bubbling
                    >
                      <input
                        type="checkbox"
                        checked={!!attendanceData[student._id]}
                        onChange={() =>
                          setAttendanceData({
                            ...attendanceData,
                            [student._id]: !attendanceData[student._id],
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-8 h-8 bg-gray-300 peer-checked:bg-green-500 rounded-full border-2 border-gray-400 flex justify-center items-center transition-all duration-300">
                        <svg
                          className="w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M20.707 5.293a1 1 0 00-1.414 0L9 15.586l-4.293-4.293a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l11-11a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button
        onClick={handleAttendanceSubmit}
        className="w-full bg-slate-800 text-white py-3  hover:bg-slate-900 rounded-lg  mt-6"
      >
        Submit Attendance
      </button>
    </div>
  );
}

export default AttendanceMarkingPage;
