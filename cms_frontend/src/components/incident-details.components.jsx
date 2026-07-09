import { useEffect, useState } from "react";

// import { useParams } from "react-router-dom";

import IncidentService from "../services/incident.service";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import assignmentService from "../services/assignment.service";
import { toast } from "react-toastify";
function IncidentDetails() {
    const { id } = useParams();

    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState(null);
    const [incident, setIncident] = useState(null);
    const [status, setStatus] = useState("");
    const [remarks, setRemarks] = useState("");

    useEffect(() => {

        IncidentService.getIncident(id)
            .then((response) => {

                setIncident(response.data);

            });

        assignmentService.getAssignmentByIncident(id)
            .then((response) => {

                setAssignment(response.data);

            })
            .catch(console.log);

    }, [id]);


    if (!incident) {

        return (

            <div className="container mt-5">

                <h4>Loading...</h4>

            </div>

        );

    }
    const assignmentsByIncident = () => {

        AssignmentService.getAssignmentByIncident(id)

            .then((response) => {

                setAssignment(response.data);

            })

            .catch(console.log);

    };

    const updateStatus = () => {

        const auth = JSON.parse(localStorage.getItem("auth"));

        const payload = {

            incidentId: incident.incidentId,

            statusId: Number(status),

            changedById: auth.userId,

            remarks: remarks

        };

        console.log(payload);

        IncidentService.updateStatus(payload)

            .then(() => {

                toast.success("Status updated successfully!");

                return IncidentService.getIncident(incident.incidentId);

            })

            .then((response) => {

                setIncident(response.data);

                setStatus(response.data.status.statusId);

                setRemarks("");

            })

            .catch((error) => {

                console.log(error);

                toast.error("Unable to update status.");

            });

    };
    const getStatusBadge = (status) => {

        switch (status.toLowerCase()) {

            case "initiated":

                return "bg-warning";

            case "active":

                return "bg-primary";

            case "verified":

                return "bg-success";

            case "closed":

                return "bg-dark";

            default:

                return "bg-secondary";

        }

    };
    const downloadReport = (id) => {

        IncidentService.downloadIncidentReport(id)

            .then((response) => {

                const url =
                    window.URL.createObjectURL(
                        new Blob([response.data])
                    );

                const link =
                    document.createElement("a");

                link.href = url;

                link.download =
                    `Incident_${id}.pdf`;

                link.click();

            });

    };
    return (

        <div className="container-fluid px-5 mt-5">

            <div className="card shadow">
                


                <div className="card-header bg-dark text-white">

                    <div className="card mb-4">

                        <div className="card-body">

                            <h2 className="fw-bold text-primary">

                                📋 Incident Details

                            </h2>

                            <p className="text-muted">

                                View complete information about the reported incident.

                            </p>

                        </div>

                    </div>

                </div>

                <div className="card mb-4">

                    <div className="card-header">

                        <h5>Incident Information</h5>

                    </div>

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-6">

                                <strong>Incident ID</strong>

                                <p>{incident.incidentId}</p>

                            </div>

                            <div className="col-md-6">

                                <strong>Incident Type</strong>

                                <p>{incident.incidentType.incidentTypeName}</p>

                            </div>

                        </div>

                        <div className="row mt-3">

                            <div className="col-md-6">

                                <strong>Title</strong>

                                <p>{incident.title}</p>

                            </div>

                            <div className="col-md-6">

                                <strong>Status</strong>

                                <br />

                                <span
                                    className={`badge ${getStatusBadge(
                                        incident.status.statusName
                                    )}`}
                                >
                                    {incident.status.statusName}
                                </span>

                            </div>

                        </div>

                        <div className="row mt-3">

                            <div className="col-md-6">

                                <strong>Location</strong>

                                <p>{incident.location}</p>

                            </div>

                            <div className="col-md-6">

                                <strong>Reported On</strong>

                                <p>

                                    {new Date(
                                        incident.incidentDate
                                    ).toLocaleString()}

                                </p>

                            </div>

                        </div>

                    </div>



                    <div className="card mb-4">

                        <div className="card-header">

                            <h5>Description</h5>

                        </div>

                        <div className="card-body">

                            {incident.description}

                        </div>

                    </div>

                    {/* <div className="card mb-4"> */}

                    {auth.role === "Officer" && (

                        <div className="card mt-4">

                            <div className="card-header">

                                Update Investigation

                            </div>

                            <div className="card-body">

                                <select

                                    className="form-select"

                                    value={status}

                                    onChange={(e) => setStatus(e.target.value)}

                                >



                                    <option value="2">

                                        active

                                    </option>


                                    <option value="4">

                                        Closed

                                    </option>


                                </select>
                                <textarea

                                    className="form-control mt-3"

                                    rows="3"

                                    placeholder="Investigation remarks"

                                    value={remarks}

                                    onChange={(e) => setRemarks(e.target.value)}

                                ></textarea>
                                <button

                                    className="btn btn-primary mt-3"

                                    onClick={updateStatus}

                                >

                                    Update Status

                                </button>

                            </div>

                        </div>

                    )}
                    {/* </div> */}


                    <div className="card mb-4">

                        <div className="card-header">

                            <h5>Assigned Officer</h5>

                        </div>

                        <div className="card-body">

                            {assignment ?

                                <>

                                    <strong>Name</strong>

                                    <p>

                                        {assignment.officer.firstName}

                                        {" "}

                                        {assignment.officer.lastName}

                                    </p>

                                </>

                                :

                                <p className="text-muted">

                                    Not Assigned

                                </p>

                            }

                        </div>

                    </div>

                    {/* <button

                        className="btn btn-success"

                        onClick={() =>
                            downloadReport(
                                incident.incidentId
                            )
                        }

                    >

                        Download Status Card

                    </button> */}
                    <div className="d-flex justify-content-end gap-3">

                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate(-1)}
                        >

                            Back

                        </button>
                        <button
                            className="btn btn-success"
                            onClick={() => downloadReport(incident.incidentId)}

                        >

                            Download PDF

                        </button>
                    </div>

                </div>

            </div>

        </div >

    );
}

export default IncidentDetails;