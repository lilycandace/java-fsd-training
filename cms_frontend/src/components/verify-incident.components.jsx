import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import IncidentService from "../services/incident.service";
import StatusHistoryService from "../services/status-history.service";
import assignmentService from "../services/assignment.service";
import { toast } from "react-toastify";

function VerifyIncident() {

    const auth = useSelector(state => state.auth);

    // const [incidents, setIncidents] = useState([]);
    const [history, setHistory] = useState([]);

    const [selectedIncident, setSelectedIncident] = useState(null);
    const viewRemarks = (incidentId) => {

        StatusHistoryService.getHistory(incidentId)

            .then((response) => {

                setHistory(response.data);

                setSelectedIncident(incidentId);

            })

            .catch(console.log);

    }
    const [assignments, setAssignments] = useState([]);
    const loadClosedCases = () => {

        assignmentService.getClosedAssignments()

            .then((response) => {

                setAssignments(response.data);

            })

            .catch(console.log);

    };

    useEffect(() => {

        loadClosedCases();

    }, []);


    const verifyIncident = (assignment) => {

        StatusHistoryService.updateStatus({

            incidentId: assignment.incidentId,

            statusId: 3,

            changedById: auth.userId,

            remarks: "Verified by Station Head"

        })
            .then(() => {

                toast.success("Incident verified successfully.");

                loadClosedCases();

            })
            .catch(console.log);

    };
    return (

        <div className="container mt-5">

            <h2>Verify Closed Cases</h2>
            {assignments.length === 0 ? (

                <div className="card shadow mt-5 text-center p-5">

                    <i className="bi bi-folder-x display-1 text-secondary"></i>

                    <h4 className="mt-3">

                        No incidents found

                    </h4>

                    <p className="text-muted">

                        No Incidents Closed yet

                    </p>

                </div>

            ) : (



                <table className="table table-striped">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Citizen</th>

                            <th>Officer</th>

                            <th>Assigned On</th>

                            <th>Closed On</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {assignments.map((a) => (

                            <tr key={a.assignmentId}>

                                <td>{a.incidentId}</td>

                                <td>{a.citizenName}</td>

                                <td>{a.officerName}</td>

                                <td>

                                    {new Date(a.assignedAt).toLocaleString()}

                                </td>

                                <td>

                                    {a.closedAt
                                        ? new Date(a.closedAt).toLocaleString()
                                        : "-"}

                                </td>

                                <td>
                                    <button
                                        className="btn btn-outline-primary btn-sm me-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#remarksModal"
                                        onClick={() => viewRemarks(a.incidentId)}
                                    >

                                        View Remarks

                                    </button>

                                    <button

                                        className="btn btn-success btn-sm"

                                        onClick={() => verifyIncident(a)}

                                    >

                                        Verify

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}
            <div
                className="modal fade"
                id="remarksModal"
                tabIndex="-1"
            >

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title">

                                Investigation Remarks

                            </h5>

                            <button
                                className="btn-close"
                                data-bs-dismiss="modal"
                            />

                        </div>

                        <div className="modal-body">

                            {history.length === 0 ? (

                                <p>No remarks available.</p>

                            ) : (

                                history.map((h) => (

                                    <div
                                        key={h.historyId}
                                        className="card mb-3 shadow-sm"
                                    >

                                        <div className="card-body">

                                            <h6>

                                                Status

                                            </h6>

                                            <p>

                                                {h.oldStatus.statusName}

                                                →

                                                {h.newStatus.statusName}

                                            </p>

                                            <h6>

                                                Officer Remarks

                                            </h6>

                                            <p>

                                                {h.remarks || "No remarks"}

                                            </p>

                                            <small className="text-muted">

                                                {new Date(h.changedAt).toLocaleString()}

                                            </small>

                                        </div>

                                    </div>

                                ))

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default VerifyIncident;