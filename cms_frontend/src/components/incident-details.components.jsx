import { useEffect, useState } from "react";

// import { useParams } from "react-router-dom";

import IncidentService from "../services/incident.service";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
function IncidentDetails() {
    const { id } = useParams();

    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [incident, setIncident] = useState(null);
    const [status, setStatus] = useState("");
    const [remarks, setRemarks] = useState("");

    useEffect(() => {

        IncidentService.getIncident(id)

            .then((response) => {

                setIncident(response.data);

                setStatus(response.data.status.statusName);

            });

    }, [id]);


    if (!incident) {

        return (

            <div className="container mt-5">

                <h4>Loading...</h4>

            </div>

        );

    }
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

                alert("Status updated successfully!");

                return IncidentService.getIncident(incident.incidentId);

            })

            .then((response) => {

                setIncident(response.data);

                setStatus(response.data.status.statusId);

                setRemarks("");

            })

            .catch((error) => {

                console.log(error);

                alert("Unable to update status.");

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

        <div className="container mt-5">

            <div className="card shadow">
                <div className="d-flex justify-content-start">

                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => navigate("/incidents")}
                    >
                        ← Back
                    </button>

                </div>

                <div className="card-header bg-dark text-white">

                    <h3>

                        Incident Details

                    </h3>

                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6">

                            <p>

                                <strong>

                                    Incident ID

                                </strong>

                            </p>

                            <p>

                                {incident.incidentId}

                            </p>

                        </div>

                        <div className="col-md-6">

                            <p>

                                <strong>

                                    Incident Type

                                </strong>

                            </p>

                            <p>

                                {incident.incidentType.incidentTypeName}

                            </p>

                        </div>

                    </div>

                    <hr />

                    <div className="row">

                        <div className="col-md-6">

                            <p>

                                <strong>

                                    Title

                                </strong>

                            </p>

                            <p>

                                {incident.title}

                            </p>

                        </div>

                        <div className="col-md-6">

                            <p>

                                <strong>

                                    Status

                                </strong>

                            </p>

                            <span

                                className={`badge ${getStatusBadge(
                                    incident.status.statusName
                                )}`}

                            >

                                {incident.status.statusName}

                            </span>

                        </div>

                    </div>

                    <hr />

                    <p>

                        <strong>

                            Description

                        </strong>

                    </p>

                    <p>

                        {incident.description}

                    </p>
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

                            

                                <option value="1">

                                        active

                                    </option>


                                    <option value="2">

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

                    <hr />

                    <p>

                        <strong>

                            Location

                        </strong>

                    </p>

                    <p>

                        {incident.location}

                    </p>

                    <hr />

                    <p>

                        <strong>

                            Reported On

                        </strong>

                    </p>

                    <p>

                        {new Date(
                            incident.incidentDate
                        ).toLocaleString()}

                    </p>

                    <hr />

                    <h5>

                        Officer Assigned

                    </h5>

                    {
                        incident.assignments?.length > 0

                            ?

                            <p>

                                Officer Assigned

                            </p>

                            :

                            <p className="text-muted">

                                Not Assigned Yet

                            </p>

                    }

                    <hr />

                    <button

                        className="btn btn-success"

                        onClick={() =>
                            downloadReport(
                                incident.incidentId
                            )
                        }

                    >

                        Download Status Card

                    </button>


                </div>

            </div>

        </div>

    );
}

export default IncidentDetails;