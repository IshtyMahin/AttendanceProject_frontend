import { useState, useEffect } from "react";
import axios from "axios";
import SecondNav from "../components/SecondNav";
import ErrorMessage from "../components/ErrorMessage";
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
  const [courses, setCourses] = useState([]);
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
  const [error, setError] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/departments")
      .then((response) => {
        setDepartments(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching departments. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleDepartmentChange = (deptId) => {
    setError("");
    setNewDepartment(deptId);
    setNewSession("");
    setSessions([]);
    if (deptId) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/sessions?departmentId=${deptId}`)
        .then((response) => {
          setSessions(response.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Error fetching sessions. Please try again later.");
          setLoading(false);
        });
    }
  };

  const handleCourseFetch = () => {
    setError("");
    if (newDepartment && newSession && newCourse.semester) {
      setLoading(true);
      axios
        .get(
          `http://localhost:5000/api/courses?year=${newSession}&departmentId=${newDepartment}&semesterNumber=${newCourse.semester}`
        )
        .then((response) => {
          setCourses(response.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Error fetching courses. Please try again later.");
          setLoading(false);
        });
    }
  };

  const handleAddDepartment = async () => {
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/departments", {
        name: newDepartment,
      });
      setAlert({ message: "Department added successfully!", type: "success" });
      setLoading(false);
    } catch {
      setError("Error adding department. Please try again later.");
      setLoading(false);
    }
  };

  const handleAddSession = async () => {
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/sessions", {
        department: newDepartment,
        year: newSession,
      });
      setAlert({ message: "Session added successfully!", type: "success" });
      setLoading(false);
    } catch {
      setError("Error adding session. Please try again later.");
      setLoading(false);
    }
  };

  const handleAddCourse = async () => {
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/courses", newCourse);
      setAlert({ message: "Course added successfully!", type: "success" });
      setLoading(false);
    } catch {
      setError("Error adding course. Please try again later.");
      setLoading(false);
    }
  };

  const handleAddStudent = async () => {
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/students", newStudent);
      setAlert({ message: "Student added successfully!", type: "success" });
      setLoading(false);
    } catch {
      setError("Error adding student. Please try again later.");
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
      <ErrorMessage error={error} />
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        />
      )}
      {currentSection === "addDepartment" && (
        <AddDepartmentForm
          newDepartment={newDepartment}
          setNewDepartment={setNewDepartment}
          handleAddDepartment={handleAddDepartment}
        />
      )}
      {currentSection === "addSession" && (
        <AddSessionForm
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
