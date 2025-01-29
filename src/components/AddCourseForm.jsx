function AddCourseForm({
  departments,
  sessions,
  semesters,
  newCourse,
  setNewCourse,
  handleAddCourse,
  handleDepartmentChange, 
}) {
  return (
    <div className="mb-6">
      <select
        value={newCourse.department}
        onChange={(e) => {
          const deptId = e.target.value;
          setNewCourse({
            ...newCourse,
            department: deptId,
            session: "",
            semester: "",
          });
          handleDepartmentChange(deptId);
        }}
        className=" mt-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
      >
        <option value="">Select Department</option>
        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>
            {dept.name}
          </option>
        ))}
      </select>

      {newCourse.department && (
        <>
          <select
            value={newCourse.session}
            onChange={(e) =>
              setNewCourse({
                ...newCourse,
                session: e.target.value,
                semester: "",
              })
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

      {newCourse.session && (
        <>
          <select
            value={newCourse.semester}
            onChange={(e) =>
              setNewCourse({ ...newCourse, semester: e.target.value })
            }
            className="mt-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>

          <label className="block text-gray-700 text-lg font-semibold mb-2 mt-4">
            Course Name
          </label>
          <input
            type="text"
            value={newCourse.name}
            onChange={(e) =>
              setNewCourse({ ...newCourse, name: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          />

          <label className="block text-gray-700 text-lg font-semibold mb-2 mt-4">
            Course Code
          </label>
          <input
            type="text"
            value={newCourse.code}
            onChange={(e) =>
              setNewCourse({ ...newCourse, code: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </>
      )}

      <button
        onClick={handleAddCourse}
        className="w-full bg-slate-800 text-white p-3 mt-4 rounded-lg hover:bg-slate-900 focus:ring-2 focus:ring-slate-300 transition"
      >
        Add Course
      </button>
    </div>
  );
}

export default AddCourseForm;
