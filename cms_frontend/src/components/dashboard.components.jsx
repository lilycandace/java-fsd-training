import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import IncidentService from "../services/incident.service";
import { Link, useNavigate } from "react-router-dom";
import AssignmentService from "../services/assignment.service";
import userService from "../services/user.service";
import { FaClipboardList, FaDoorClosed } from "react-icons/fa";
import { FaClock, FaSpinner, FaCheckCircle, FaUserShield, FaUsers, FaTimesCircle, FaUser, FaHourglassStart } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { PiDetectiveFill } from "react-icons/pi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { MdLocalPolice } from "react-icons/md";
import { HiFlag } from "react-icons/hi";

export default function Dashboard() {

    const auth = useSelector((state) => state.auth);
    const [incidents, setIncidents] = useState([]);
    const [assignments, setAssignments] = useState([]);
    //for stationhead
    const [officers, setOfficers] = useState([]);

    const [citizens, setCitizens] = useState([]);


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
                    console.table(
                        response.data.map(a => ({
                            incidentId: a.incident.incidentId,
                            status: a.incident.status.statusName
                        }))
                    );
                    setAssignments(response.data);
                });

        }
        if (auth.role === "Stationhead") {

            loadDashboard();

        }

    }, []);
    const loadDashboard = () => {

        userService.getAllOfficers()

            .then(res => setOfficers(res.data));

        userService.getAllCitizens()

            .then(res => setCitizens(res.data));

        // IncidentService.getAllIncidents()

        //     .then(res => setIncidents(res.data));
        IncidentService.getAllIncidents()
            .then(res => {

                console.log("Dashboard Incidents:", res.data);

                res.data.forEach(i => {
                    console.log(
                        i.incidentId,
                        i.status.statusId,
                        i.status.statusName
                    );
                });

                setIncidents(res.data);

            });


    };

    const totalOfficers = officers.length;

    const totalCitizens = citizens.length;

    const totalIncidents = incidents.length;
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

    const officerActive = assignments.filter(
        a => a.incident.status.statusName.toLowerCase() === "active"
    ).length;

    const officerVerified = assignments.filter(
        a => a.incident.status.statusName.toLowerCase() === "verified"
    ).length;

    const officerClosed = assignments.filter(
        a => a.incident.status.statusName.toLowerCase() === "closed"
    ).length;


    console.log(auth);

    return (

        <div className="container mt-4">

            <div className="mb-4">

                {/* <h2 className="fw-bold">

                    Welcome back,

                    <span className="text-primary">

                        {" "}{auth.firstName}

                    </span>

                    👋

                </h2> */}

                <p className="text-secondary">

                    {auth.role} Dashboard

                </p>

            </div>
            {auth.role === "Citizen" && (
                <>


                    <div className="row mt-4">


                        <div className="col-md-3">


                            <div className="card dashboard-card">

                                <div className="card-body">

                                    <FaClipboardList
                                        size={40}
                                        color="#0D6EFD"
                                        className="mb-3"
                                    />

                                    <h6>Total Incidents</h6>

                                    <h2>{total}</h2>

                                </div>
                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="card dashboard-card">

                                <div className="card-body">

                                    <FaClock
                                        size={40}
                                        color="#FFC107"
                                        className="mb-3"
                                    />

                                    <h6>Pending</h6>

                                    <h2>{initiated}</h2>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-3">
                            <div className="card dashboard-card">
                                <div className="card-body">
                                    <FaSpinner
                                        size={40}
                                        color="#07ff13"
                                        className="mb-3"
                                    />
                                    <h6>In Progress</h6>
                                    <h2>{inProgress}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card dashboard-card">
                                <div className="card-body">
                                    <FaDoorClosed
                                        size={40}
                                        color="#9b1010"
                                        className="mb-3"
                                    />
                                    <h6>Resolved</h6>
                                    <h2>{resolved}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card dashboard-card">
                                <div className="card-body">
                                    <FaCheckCircle
                                        size={40}
                                        color="#109b5a"
                                        className="mb-3"
                                    />
                                    <h6>Verified</h6>
                                    <h2>{verified}</h2>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="card mt-4 w-100">

                        <div className="card-body">

                            <h4 className="mb-4">

                                Recent Incidents

                            </h4>
                            {incidents.length === 0 ? (

                                <div className="card shadow mt-5 text-center p-5">

                                    <i className="bi bi-folder-x display-1 text-secondary"></i>

                                    <h4 className="mt-3">

                                        No incidents found

                                    </h4>

                                    <p className="text-muted">

                                        Report your first incident to get started.

                                    </p>

                                </div>

                            ) : (


                                <table className="table table-hover">

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

                                                    {/* <td>{incident.incidentType?.typeName}</td> */}
                                                    <td>{incident.incidentType.incidentTypeName}</td>

                                                    <td>

                                                        {incident.status.statusName === "initiated" &&

                                                            <span className="badge bg-warning">

                                                                Initiated

                                                            </span>

                                                        }

                                                        {incident.status.statusName === "active" &&

                                                            <span className="badge bg-primary">

                                                                Active

                                                            </span>

                                                        }

                                                        {incident.status.statusName === "verified" &&

                                                            <span className="badge bg-success">

                                                                Verified

                                                            </span>

                                                        }

                                                        {incident.status.statusName === "closed" &&

                                                            <span className="badge bg-dark">

                                                                Closed

                                                            </span>

                                                        }

                                                    </td>

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
                            )}
                        </div>
                    </div>
                    {/* <div className="card mt-4">

                        <div className="card-body">

                            <h5>

                                Quick Actions

                            </h5>

                            <div className="d-flex gap-3 mt-3">

                                <button
                                    className="btn btn-danger"
                                    onClick={() => navigate("/incidents/create")}
                                >

                                    Report Incident

                                </button>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate("/incidents")}
                                >

                                    My Incidents

                                </button>

                            </div>

                        </div>

                    </div> */}
                </>
            )}
            {auth.role === "Officer" && (

                <div className="row mt-4">

                    {/* Officer dashboard here */}

                    <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                        <div className="card dashboard-card">
                            <div className="card-body">
                                <MdAssignmentAdd
                                    size={40}
                                    color="#f0f33b"
                                    className="mb-3"
                                />
                                <h6>Assigned </h6>
                                <h2>{assigned}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                        <div className="card dashboard-card">
                            <div className="card-body">
                                <PiDetectiveFill
                                    size={40}
                                    color="#121ca0"
                                    className="mb-3"
                                />
                                <h6>Active</h6>
                                <h2>{officerActive}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                        <div className="card dashboard-card">
                            <div className="card-body">
                                <MdOutlineVerifiedUser
                                    size={40}
                                    color="#12a02c"
                                    className="mb-3"
                                />
                                <h6>Verified</h6>
                                <h2>{officerVerified}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                        <div className="card dashboard-card">
                            <div className="card-body">
                                <FaDoorClosed
                                    size={40}
                                    color="#12a08d"
                                    className="mb-3"
                                />

                                <h6>Closed</h6>
                                <h2>{officerClosed}</h2>
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

                                    {/* <td>{assignment.incident.status.statusName}</td> */}
                                    {/* //with styling */}
                                    <td>

                                        {assignment.incident.status.statusName === "initiated" &&

                                            <span className="badge bg-warning">

                                                Initiated

                                            </span>

                                        }

                                        {assignment.incident.status.statusName === "active" &&

                                            <span className="badge bg-primary">

                                                Active

                                            </span>

                                        }

                                        {assignment.incident.status.statusName === "verified" &&

                                            <span className="badge bg-success">

                                                Verified

                                            </span>

                                        }

                                        {assignment.incident.status.statusName === "closed" &&

                                            <span className="badge bg-dark">

                                                Closed

                                            </span>

                                        }

                                    </td>

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

    </div> */}{auth.role === "Stationhead" && (

                <div>

                    {/* <h2>

                        Welcome {auth.firstName}

                    </h2> */}



                    <div className="row mt-4">

                        <div className="col-md-3">

                            <div className="card dashboard-card">

                                <div className="card-body">
                                    <MdLocalPolice
                                        size={40}
                                        color="#0f0646"
                                        className="mb-3"
                                    />


                                    <h6>Total Officers</h6>

                                    <h2>{totalOfficers}</h2>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="card dashboard-card">

                                <div className="card-body">
                                    <FaUser
                                        size={40}
                                        color="#3eddfd"
                                        className="mb-3"
                                    />

                                    <h6>Total Citizens</h6>

                                    <h2>{totalCitizens}</h2>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="card dashboard-card">

                                <div className="card-body">
                                    <HiFlag
                                        size={40}
                                        color="#8ff0ce"
                                        className="mb-3"
                                    />


                                    <h6>Total Incidents</h6>

                                    <h2>{totalIncidents}</h2>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="card dashboard-card">

                                <div className="card-body">
                                    <FaHourglassStart
                                        size={40}
                                        color="#9d9d16"
                                        className="mb-3"
                                    />


                                    <h6>Initiated</h6>

                                    <h2>{initiated}</h2>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-3 mt-3">

                            <div className="card dashboard-card">

                                <div className="card-body">
                                    <FaSpinner
                                        size={40}
                                        color="#07ff13"
                                        className="mb-3"
                                    />

                                    <h6>Active</h6>

                                    <h2>{inProgress}</h2>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-3 mt-3">

                            <div className="card dashboard-card">

                                <div className="card-body">
                                    <FaDoorClosed
                                        size={40}
                                        color="#9b1010"
                                        className="mb-3"
                                    />

                                    <h6>Closed</h6>

                                    <h2>{resolved}</h2>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-3 mt-3">

                            <div className="card dashboard-card">

                                <div className="card-body">
                                    <FaCheckCircle
                                        size={40}
                                        color="#109b5a"
                                        className="mb-3"
                                    />

                                    <h6>Verified</h6>

                                    <h2>{verified}</h2>

                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="mt-5">

                        <h4>

                            Latest Incidents

                        </h4>

                        <table className="table table-striped">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Citizen</th>

                                    <th>Title</th>

                                    <th>Status</th>

                                    <th>View</th>

                                </tr>

                            </thead>

                            <tbody>

                                {incidents.slice(0, 5).map(i => (

                                    <tr key={i.incidentId}>

                                        <td>{i.incidentId}</td>

                                        <td>

                                            {i.user.firstName} {i.user.lastName}

                                        </td>

                                        <td>{i.title}</td>

                                        {/* <td>{i.status.statusName}</td> */}
                                        <td>

                                            {i.status.statusName === "initiated" &&

                                                <span className="badge bg-warning">

                                                    Initiated

                                                </span>

                                            }

                                            {i.status.statusName === "active" &&

                                                <span className="badge bg-primary">

                                                    Active

                                                </span>

                                            }

                                            {i.status.statusName === "verified" &&

                                                <span className="badge bg-success">

                                                    Verified

                                                </span>

                                            }

                                            {i.status.statusName === "closed" &&

                                                <span className="badge bg-dark">

                                                    Closed

                                                </span>

                                            }

                                        </td>

                                        <td>

                                            <Link

                                                className="btn btn-primary btn-sm"

                                                to={`/incidents/${i.incidentId}`}

                                            >

                                                View

                                            </Link>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}


        </div>

    );

}