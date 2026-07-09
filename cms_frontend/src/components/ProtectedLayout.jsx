import Navbar from "./Navbar";
import "../styles/app-background.css";

function ProtectedLayout({ children }) {
    return (
        <div className="app-background">

            <Navbar />

            <div className="container py-4">

                {children}

            </div>

        </div>
    );
}

export default ProtectedLayout;