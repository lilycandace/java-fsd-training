import { useSelector } from "react-redux";
import "../styles/homestyle.css";
import { Link } from "react-router-dom";


function Home() {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="home">

      <div className="alert-banner">
        Sign Up or Login to File Complaints and Access Criminal Records
      </div>

      <section className="hero">
        <div className="hero-content">
          <h1>Crime Management System</h1>
          <p>
            A secure digital platform designed to simplify crime reporting,
            investigation tracking, and public safety awareness.
          </p>
          {auth.isLoggedIn && auth.role === "Citizen" && (

    <Link to="/incidents/create">

        <button className="hero-btn">

            Report Incident

        </button>

    </Link>

)}
        
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f"
            alt="Law Enforcement"
          />
        </div>
      </section>

      <section className="cards-section">
        <div className="info-card">
          <h3>Crime Reporting</h3>
          <p>
            Submit complaints online with supporting evidence and track their
            progress in real-time.
          </p>
        </div>

        <div className="info-card">
          <h3>Case Tracking</h3>
          <p>
            Monitor investigations and stay updated with transparent status
            updates.
          </p>
        </div>

        <div className="info-card">
          <h3>Public Safety</h3>
          <p>
            Promote community awareness and encourage responsible reporting.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
            alt="Investigation"
          />
        </div>

        <div className="about-content">
          <h2>About Crime Management System</h2>

          <p>
            The Crime Management System provides a secure and user-friendly
            platform for reporting crimes, managing investigations, and
            maintaining criminal records.
          </p>

          <p>
            Citizens can submit complaints, upload evidence, and track case
            progress, while authorized officers can manage records efficiently
            through a centralized system.
          </p>
        </div>
      </section>

      <section className="about-section reverse">
        <div className="about-content">
          <h2>Criminal Records Management</h2>

          <p>
            Authorized personnel can access criminal histories, investigation
            records, and case details securely.
          </p>

          <p>
            This reduces paperwork, improves accuracy, and supports faster
            decision-making during investigations.
          </p>
        </div>

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
            alt="Records"
          />
        </div>
      </section>

    </div>
  );
}

export default Home;