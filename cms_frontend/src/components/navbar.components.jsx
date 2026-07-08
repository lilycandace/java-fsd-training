import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

export default function Navbar() {

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {

    dispatch(logout());

    localStorage.removeItem("auth");

    navigate("/login");

  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

      <div className="container">

        <NavLink className="navbar-brand fw-bold" to="/">
          <i className="bi bi-shield-lock-fill me-2"></i>
          Crime Management System
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            {auth.isLoggedIn && auth.role === "Officer" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/officers">
                    Assigned Cases
                  </NavLink>
                </li>
                <li className="nav-item d-flex align-items-center me-3">

                  <span className="text-white">

                    <i className="bi bi-person-circle me-1"></i>

                    Welcome, {auth.firstName}

                  </span>

                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {!auth.isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>

              </>
            )}

            {auth.isLoggedIn && auth.role === "Citizen" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/incidents">
                    My Incidents
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/incidents/create">
                    Report Incident
                  </NavLink>
                </li>
                <li className="nav-item d-flex align-items-center me-3">

                  <span className="text-white">

                    <i className="bi bi-person-circle me-1"></i>

                    Welcome, {auth.firstName}

                  </span>

                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {auth.isLoggedIn && auth.role === "Stationhead" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/management">
                    Management
                  </NavLink>
                </li>

                {/* <li className="nav-item">
                  <NavLink className="nav-link" to="/assign">
                    Assign Incident
                  </NavLink>
                </li> */}

                <li className="nav-item">
                  <NavLink className="nav-link" to="/verify">
                    Verify Cases
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>

                <li className="nav-item d-flex align-items-center me-3">
                  <span className="text-white">
                    <i className="bi bi-person-circle me-1"></i>
                    Welcome, {auth.firstName}
                  </span>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-light ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>

        </div>

      </div>

    </nav>

  );

}