import { Link } from "react-router-dom";

export const Overview = () => {
  return (
    <div>
      <h2>Overview</h2>
      <div>
        <input type="text" placeholder="Search patient" />
        <button>
          <Link to="/addPatient">Add Patient</Link>
        </button>
      </div>
    </div>
  );
};
