function AddDepartmentForm({
  newDepartment,
  setNewDepartment,
  handleAddDepartment,
}) {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-lg font-semibold mb-2">
        New Department
      </label>
      <input
        type="text"
        value={newDepartment}
        onChange={(e) => setNewDepartment(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
      />
      <button
        onClick={handleAddDepartment}
        className="w-full bg-slate-800 text-white p-3 mt-4 rounded-lg hover:bg-slate-900 focus:ring-2 focus:ring-slate-300 transition"
      >
        Add Department
      </button>
    </div>
  );
}

export default AddDepartmentForm;
