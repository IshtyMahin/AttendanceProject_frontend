function AddStudentForm({
  departments,
  sessions,
  newStudent,
  setNewStudent,
  handleAddStudent,
  handleDepartmentChange,
  showAlert,
}) {
  const handleAddStudentWithValidation = () => {
    const { department, session, studentId, name } = newStudent;

    if (!department) {
      showAlert("error", "Please select a department before adding a student.");
      return;
    }

    if (!session) {
      showAlert("error", "Please select a session before adding a student.");
      return;
    }

    if (!studentId || studentId.trim() === "") {
      showAlert(
        "error",
        "Student ID cannot be empty. Please provide a valid ID."
      );
      return;
    }

    if (!name || name.trim() === "") {
      showAlert(
        "error",
        "Student name cannot be empty. Please provide a valid name."
      );
      return;
    }

    handleAddStudent();
  };

  return (
    <div className="mb-6">
      <select
        value={newStudent.department}
        onChange={(e) => {
          const deptId = e.target.value;
          setNewStudent({ ...newStudent, department: deptId });
          handleDepartmentChange(deptId);
        }}
        className="mt-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
      >
        <option value="">Select Department</option>
        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>
            {dept.name}
          </option>
        ))}
      </select>

      {newStudent.department && (
        <>
          <select
            value={newStudent.session}
            onChange={(e) =>
              setNewStudent({ ...newStudent, session: e.target.value })
            }
            className="mt-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="">Select Session</option>
            {sessions.map((sess) => (
              <option key={sess._id} value={sess._id}>
                {sess.year}
              </option>
            ))}
          </select>
        </>
      )}

      <label className="block text-gray-700 text-lg font-semibold mb-2 mt-4">
        Student ID
      </label>
      <input
        type="text"
        value={newStudent.studentId}
        onChange={(e) =>
          setNewStudent({ ...newStudent, studentId: e.target.value })
        }
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
      />

      <label className="block text-gray-700 text-lg font-semibold mb-2 mt-4">
        Student Name
      </label>
      <input
        type="text"
        value={newStudent.name}
        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
      />

      <button
        onClick={handleAddStudentWithValidation}
        className="w-full bg-slate-800 text-white p-3 mt-4 rounded-lg hover:bg-slate-900 focus:ring-2 focus:ring-slate-300 transition"
      >
        Add Student
      </button>
    </div>
  );
}

export default AddStudentForm;
