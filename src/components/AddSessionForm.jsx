function AddSessionForm({
  departments,
  newDepartment,
  newSession,
  setNewDepartment,
  setNewSession,
  handleAddSession,
}) {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-lg font-semibold mb-2">
        Select Department
      </label>
      <select
        value={newDepartment}
        onChange={(e) => setNewDepartment(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
      >
        <option value="">Select Department</option>
        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>
            {dept.name}
          </option>
        ))}
      </select>

      {newDepartment && (
        <>
          <label className="block text-gray-700 text-lg font-semibold mb-2 mt-4">
            Enter Session (YYYY-YY)
          </label>
          <input
            type="text"
            value={newSession}
            onChange={(e) => setNewSession(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder="Enter session in (YYYY-YY) format"
          />
        </>
      )}
      <button
        onClick={handleAddSession}
        className="w-full bg-slate-800 text-white p-3 mt-4 rounded-lg hover:bg-slate-900 focus:ring-2 focus:ring-slate-300 transition"
      >
        Add Session
      </button>
    </div>
  );
}

export default AddSessionForm;
