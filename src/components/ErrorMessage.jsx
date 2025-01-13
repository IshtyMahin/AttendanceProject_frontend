function ErrorMessage({ error }) {
  return (
    error && (
      <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
        <strong>Error: </strong>
        {error}
      </div>
    )
  );
}

export default ErrorMessage;
