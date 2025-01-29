import { useState, useEffect } from "react";
import axios from "axios";
import SecondNav from "../components/SecondNav";
import AddDepartmentForm from "../components/AddDepartmentForm";
import AddSessionForm from "../components/AddSessionForm";
import AddCourseForm from "../components/AddCourseForm";
import AddStudentForm from "../components/AddStudentForm";
import Alert from "../components/Alert";
import Loading from "../components/Loading";

function SetupPage() {
  const [departments, setDepartments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [semesters] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [newDepartment, setNewDepartment] = useState("");
  const [newSession, setNewSession] = useState("");
  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    department: "",
    session: "",
    semester: "",
  });
  const [newStudent, setNewStudent] = useState({
    studentId: "",
    name: "",
    department: "",
    session: "",
  });
  const [currentSection, setCurrentSection] = useState("addDepartment");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), 5000);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://attendanceproject-backend.onrender.com/api/departments")
      .then((response) => {
        setDepartments(response.data);
        setLoading(false);
      })
      .catch(() => {
        showAlert("error", "Unable to fetch departments. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleDepartmentChange = (deptId) => {
    setNewDepartment(deptId);
    setNewSession("");
    setSessions([]);
    if (deptId) {
      setLoading(true);
      axios
        .get(
          `https://attendanceproject-backend.onrender.com/api/sessions?departmentId=${deptId}`
        )
        .then((response) => {
          setSessions(response.data);
          setLoading(false);
        })
        .catch(() => {
          showAlert("error", "Error loading sessions. Please try again.");
          setLoading(false);
        });
    }
  };

  const handleAddDepartment = async () => {
    if (!newDepartment.trim()) {
      showAlert("error", "Department name cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        "https://attendanceproject-backend.onrender.com/api/departments",
        {
          name: newDepartment,
        }
      );
      showAlert("success", "Department added successfully!");
      setNewDepartment("");
    } catch {
      showAlert("error", "Error adding department. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSession = async () => {
    if (!newDepartment || !newSession.trim()) {
      showAlert("error", "Both department and session are required.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        "https://attendanceproject-backend.onrender.com/api/sessions",
        {
          department: newDepartment,
          year: newSession,
        }
      );
      showAlert("success", "Session added successfully!");
      setNewSession("");
    } catch {
      showAlert("error", "Error adding session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async () => {
    const { name, code, department, session, semester } = newCourse;
    if (!name || !code || !department || !session || !semester) {
      showAlert("error", "All fields are required to add a course.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        "https://attendanceproject-backend.onrender.com/api/courses",
        newCourse
      );
      showAlert("success", "Course added successfully!");
      // setNewCourse({
      //   name: "",
      //   code: "",
      //   department: "",
      //   session: "",
      //   semester: "",
      // });
    } catch {
      showAlert("error", "Error adding course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async () => {
    const { studentId, name, department, session } = newStudent;
    if (!studentId || !name || !department || !session) {
      showAlert("error", "All fields are required to add a student.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        "https://attendanceproject-backend.onrender.com/api/students",
        newStudent
      );
      showAlert("success", "Student added successfully!");
      // setNewStudent({ studentId: "", name: "", department: "", session: "" });
    } catch {
      showAlert("error", "Error adding student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mx-auto w-8/12">
      <SecondNav setCurrentSection={setCurrentSection} />
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loading />
        </div>
      )}
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        />
      )}
      {currentSection === "addDepartment" && (
        <AddDepartmentForm
          showAlert={showAlert}
          newDepartment={newDepartment}
          setNewDepartment={setNewDepartment}
          handleAddDepartment={handleAddDepartment}
        />
      )}
      {currentSection === "addSession" && (
        <AddSessionForm
          showAlert={showAlert}
          departments={departments}
          newDepartment={newDepartment}
          newSession={newSession}
          setNewDepartment={setNewDepartment}
          setNewSession={setNewSession}
          handleAddSession={handleAddSession}
        />
      )}
      {currentSection === "addCourse" && (
        <AddCourseForm
          showAlert={showAlert}
          departments={departments}
          sessions={sessions}
          semesters={semesters}
          newCourse={newCourse}
          setNewCourse={setNewCourse}
          handleAddCourse={handleAddCourse}
          handleDepartmentChange={handleDepartmentChange}
        />
      )}
      {currentSection === "addStudent" && (
        <AddStudentForm
          showAlert={showAlert}
          departments={departments}
          sessions={sessions}
          newStudent={newStudent}
          setNewStudent={setNewStudent}
          handleAddStudent={handleAddStudent}
          handleDepartmentChange={handleDepartmentChange}
        />
      )}
    </div>
  );
}

export default SetupPage;
