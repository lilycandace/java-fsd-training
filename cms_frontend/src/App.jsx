import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar.components";

import Home from "./components/home.components";
import Login from "./components/login.components";
import Register from "./components/register.components";
import Dashboard from "./components/dashboard.components";
import Profile from "./components/profile.components";

import CreateIncident from "./components/create-incident.components";
import IncidentList from "./components/incident-list.components";
import IncidentDetails from "./components/incident-details.components";

import OfficerList from "./components/officer-list.components";
import AssignIncident from "./components/assign-incident.components";
import VerifyIncident from "./components/verify-incident.components";
import Footer from "./components/footer.components";
import NotFound from "./components/notfound.components";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { loginSuccess } from "./redux/slices/authSlice";
function App() {

 const dispatch = useDispatch();

// useEffect(() => {

//     const auth = JSON.parse(localStorage.getItem("auth"));

//     console.log("App Loaded");
//     console.log("Stored Auth:", auth);

//     if (auth) {
//         console.log("Dispatching loginSuccess...");
//         dispatch(loginSuccess(auth));
//     }

// }, [dispatch]);
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="/incidents" element={<ProtectedRoute><IncidentList /></ProtectedRoute>} />

        <Route path="/incidents/create" element={<ProtectedRoute><CreateIncident /></ProtectedRoute>} />

        <Route path="/incidents/:id" element={<IncidentDetails />} />

        <Route path="/officers" element={<ProtectedRoute><OfficerList /></ProtectedRoute>} />

        <Route path="/assign" element={<ProtectedRoute><AssignIncident /></ProtectedRoute>} />

        <Route path="/verify" element={<ProtectedRoute><VerifyIncident /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />

    </BrowserRouter>
  );
}

export default App;