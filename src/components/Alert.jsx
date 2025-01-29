function Alert({ type = "success", message, onClose }) {
  const alertStyles = {
    success: "bg-green-50 text-green-800 border-green-400",
    error: "bg-red-50 text-red-800 border-red-400",
    info: "bg-blue-50 text-blue-800 border-blue-400",
  };

  const iconStyles = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`relative max-w-md w-full p-6 border-2 rounded-lg shadow-lg ${alertStyles[type]}`}
      >
        <div className="flex items-center gap-4">
          <span className="text-2xl">{iconStyles[type]}</span>
          <p className="flex-1 text-lg font-medium">{message}</p>
          <button
            onClick={onClose}
            className="ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 transition-transform transform hover:rotate-90"
            aria-label="Close Alert"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default Alert;
