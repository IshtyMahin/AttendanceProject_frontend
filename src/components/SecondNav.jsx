function SecondNav({ setCurrentSection }) {
  return (
    <div className="bg-slate-800 text-white p-4 rounded-t-lg shadow-lg mb-3">
      <ul className="flex justify-around">
        <li
          onClick={() => setCurrentSection("addDepartment")}
          className="cursor-pointer hover:text-slate-200 transition"
        >
          Add Department
        </li>
        <li
          onClick={() => setCurrentSection("addSession")}
          className="cursor-pointer hover:text-slate-200 transition"
        >
          Add Session
        </li>
        <li
          onClick={() => setCurrentSection("addCourse")}
          className="cursor-pointer hover:text-slate-200 transition"
        >
          Add Course
        </li>
        <li
          onClick={() => setCurrentSection("addStudent")}
          className="cursor-pointer hover:text-slate-200 transition"
        >
          Add Student
        </li>
      </ul>
    </div>
  );
}

export default SecondNav;
