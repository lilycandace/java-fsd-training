import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import IncidentService from "../services/incident.service";
import StatusHistoryService from "../services/status-history.service";
import assignmentService from "../services/assignment.service";

function VerifyIncident() {

    const auth = useSelector(state => state.auth);

    // const [incidents, setIncidents] = useState([]);
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

                alert("Incident verified successfully.");

                loadClosedCases();

            })
            .catch(console.log);

    };
    return (

        <div className="container mt-5">

            <h2>Verify Closed Cases</h2>

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

        </div>

    );
}

export default VerifyIncident;