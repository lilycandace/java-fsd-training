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
import Management from "./components/management.components";
import { loginSuccess } from "./redux/slices/authSlice";
import ForgotPassword from "./components/forgot-password";
import { ToastContainer } from "react-toastify";
function App() {

  const dispatch = useDispatch();



  // }, [dispatch]);
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />}

        />

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

        <Route path="/assign/:id" element={<ProtectedRoute><AssignIncident /></ProtectedRoute>} />

        <Route path="/verify" element={<ProtectedRoute><VerifyIncident /></ProtectedRoute>} />
        <Route path="/management" element={<ProtectedRoute>   <Management /> </ProtectedRoute>}
        />


        <Route path="*" element={<NotFound />} />
        

      </Routes>
      <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <Footer />

    </BrowserRouter>
  );
}

export default App;