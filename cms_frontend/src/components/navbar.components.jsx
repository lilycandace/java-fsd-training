import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import {
  FaHome, FaTachometerAlt, FaUser,
  FaClipboardList,
  FaUserShield,
  FaCheckCircle,
  FaUsers,
  FaSignOutAlt,
  FaShieldAlt,
  FaPlusCircle
} from "react-icons/fa";
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

    <nav className="navbar navbar-expand-lg shadow sticky-top custom-navbar">

      <div className="container-fluid px-4">

        <NavLink className="navbar-brand fw-bold fs-4" to="/">
          <FaShieldAlt className="me-2 text-warning" />
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

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                {/* <FaHome className="me-2" /> */}
                Home
              </NavLink>
            </li>
            {auth.isLoggedIn && auth.role === "Officer" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    {/* <FaTachometerAlt className="me-2" /> */}
                    Dashboard
                  </NavLink>
                </li>



                <li className="nav-item">
                  <NavLink className="nav-link" to="/officers">
                    {/* <FaUserShield className="me-2" /> */}
                    Assigned Cases
                  </NavLink>
                </li>
                <li className="nav-item d-flex align-items-center me-3">

                  <span className="welcome-text">

                    <i className="bi bi-person-circle me-1"></i>

                    Welcome, {auth.firstName}

                  </span>

                </li>

                <li className="nav-item">

                  <NavLink className="nav-link" to="/profile">

                    Profile

                  </NavLink>

                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light rounded-pill ms-3"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" />
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
                    {/* <FaTachometerAlt className="me-2" /> */}
                    Dashboard
                  </NavLink>
                </li>



                <li className="nav-item">
                  <NavLink className="nav-link" to="/incidents">
                    {/* <FaClipboardList className="me-2" /> */}
                    My Incidents
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/incidents/create">
                    {/* <FaPlusCircle className="me-2" /> */}
                    Report Incident
                  </NavLink>
                </li>

                <li className="nav-item d-flex align-items-center me-3">

                  <span className="welcome-text">

                    <i className="bi bi-person-circle me-1"></i>

                    Welcome, {auth.firstName}

                  </span>

                </li> <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    {/* <FaUser className="me-2" /> */}
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light rounded-pill ms-3"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </button>
                </li>
              </>
            )}
            {auth.isLoggedIn && auth.role === "Stationhead" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    {/* <FaTachometerAlt className="me-2" /> */}
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/management">
                    {/* <FaUsers className="me-2" /> */}
                    Management
                  </NavLink>
                </li>


                <li className="nav-item">
                  <NavLink className="nav-link" to="/verify">
                    {/* <FaCheckCircle className="me-2" /> */}
                    Verify Cases
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    {/* <FaUser className="me-2" /> */}
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
                    className="btn btn-outline-light rounded-pill ms-3"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" />
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