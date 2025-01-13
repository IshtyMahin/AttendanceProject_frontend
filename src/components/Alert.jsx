function Alert({ type = "success", message, onClose }) {
  const alertStyles = {
    success: "bg-green-100 text-green-800 border-green-500",
    error: "bg-red-100 text-red-800 border-red-500",
    info: "bg-blue-100 text-blue-800 border-blue-500",
  };

  return (
    <div
      className={`fixed top-4 right-4 p-4 border-l-4 rounded shadow-md ${alertStyles[type]}`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Alert;
