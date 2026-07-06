import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {

    const auth = useSelector((state) => state.auth);

    return auth.isLoggedIn
        ? children
        : <Navigate to="/login" replace />;
}