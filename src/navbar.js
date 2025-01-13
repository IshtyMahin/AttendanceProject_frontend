
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-800 p-4">
      <ul className="flex justify-around">
        <li>
          <Link to="/" className="text-white font-bold hover:text-gray-300">
            Attendance Marking
          </Link>
        </li>
        <li>
          <Link
            to="/attendance-report"
            className="text-white font-bold hover:text-gray-300"
          >
            Attendance Report
          </Link>
        </li>
        <li>
          <Link
            to="/setup"
            className="text-white font-bold hover:text-gray-300"
          >
            Setup Page
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
