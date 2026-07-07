import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import IncidentService from "../services/incident.service";
import { Link, useNavigate } from "react-router-dom";
import AssignmentService from "../services/assignment.service";

export default function Dashboard() {

    const auth = useSelector((state) => state.auth);
    const [incidents, setIncidents] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {

        if (auth.role === "Citizen") {

            IncidentService.getMyIncidents()
                .then((response) => {
                    setIncidents(response.data);
                });

        }

        if (auth.role === "Officer") {

            AssignmentService.getAssignmentsByOfficer(auth.userId)
                .then((response) => {
                    setAssignments(response.data);
                });

        }

    }, []);
    const total = incidents.length;

    const initiated = incidents.filter(

        i => i.status?.statusName === "initiated"

    ).length;

    const inProgress = incidents.filter(

        i => i.status?.statusName === "active"

    ).length;
    const verified = incidents.filter(

        i => i.status?.statusName === "verified"

    ).length;

    const resolved = incidents.filter(

        i => i.status?.statusName === "closed"

    ).length;
    incidents.slice(0, 5)
    const assigned = assignments.length;

    const initiatedAssgn = assignments.filter(
        a => a.incident.status.statusName.toLowerCase() === "initiated"
    ).length;

    const active = assignments.filter(
        a => a.incident.status.statusName.toLowerCase() === "active"
    ).length;

    const verifiedAssgn = assignments.filter(
        a => a.incident.status.statusName.toLowerCase() === "verified"
    ).length;

    const closed = assignments.filter(
        a => a.incident.status.statusName.toLowerCase() === "closed"
    ).length;


    console.log(auth);

    return (

        <div className="container mt-4">

            <h2>
                Welcome, {auth.firstName} 👋
            </h2>
               {auth.role === "Citizen" && (
<>
            <p className="text-muted">
                Citizen Dashboard
            </p>

            <div className="row mt-4">

                <div className="col-md-3">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h6>Total Incidents</h6>
                            <h2>{total}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h6>Pending</h6>
                            <h2>{initiated}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h6>In Progress</h6>
                            <h2>{inProgress}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h6>Resolved</h6>
                            <h2>{resolved}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h6>Verified</h6>
                            <h2>{verified}</h2>
                        </div>
                    </div>
                </div>

            </div>
               <div className="mt-5">

                <h4>Recent Incidents</h4>

                <table className="table table-striped table-hover">

                    <thead>

                        <tr>

                            <th>Title</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {incidents.length === 0 ? (

                            <tr>

                                <td colSpan="4" className="text-center">

                                    No incidents found.

                                </td>

                            </tr>

                        ) : (

                            incidents.slice(0, 5).map((incident) => (

                                <tr key={incident.incidentId}>

                                    <td>{incident.title}</td>

                                    <td>{incident.incidentType?.typeName}</td>

                                    <td>{incident.status?.statusName}</td>

                                    <td>

                                        {new Date(
                                            incident.incidentDate
                                        ).toLocaleDateString()}

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>
            </>
               )}
            {auth.role === "Officer" && (

                <div className="row mt-4">

                    {/* Officer dashboard here */}

                    <div className="col-md-3">
                        <div className="card shadow text-center">
                            <div className="card-body">
                                <h6>Assigned Cases</h6>
                                <h2>{assigned}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow text-center">
                            <div className="card-body">
                                <h6>Active</h6>
                                <h2>{active}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow text-center">
                            <div className="card-body">
                                <h6>Verified</h6>
                                <h2>{verified}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card shadow text-center">
                            <div className="card-body">
                                <h6>Closed</h6>
                                <h2>{closed}</h2>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {assignments.slice(0, 5).map((assignment) => (

                                <tr key={assignment.assignmentId}>

                                    <td>{assignment.incident.incidentId}</td>

                                    <td>{assignment.incident.title}</td>

                                    <td>{assignment.incident.status.statusName}</td>

                                    <td>

                                        <Link
                                            className="btn btn-primary btn-sm"
                                            to={`/incidents/${assignment.incident.incidentId}`}
                                        >
                                            View
                                        </Link>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>


            )}

            {/* <div className="mt-5">

        <h4>Quick Actions</h4>

        <div className="d-flex gap-3">

            <button
                className="btn btn-danger"
                onClick={() => navigate("/api/incidents/createIncident")}
            >
                Report Incident
            </button>

            <button
                className="btn btn-primary"
                onClick={() => navigate("/myIncidents")}
            >
                My Incidents
            </button>

        </div>

    </div> */}


        </div>

    );

}