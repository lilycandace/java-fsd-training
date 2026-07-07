import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import AssignmentService from "../services/assignment.service";

function OfficersList() {
    const auth = useSelector((state) => state.auth);

const [assignments, setAssignments] = useState([]);



useEffect(() => {

    AssignmentService.getAssignmentsByOfficer(auth.userId)

        .then((response) => {

            console.log(response.data);

            setAssignments(response.data);

        })

        .catch(console.log);

}, []);
     return (
        
<>

      <div className="container mt-5">
        

    <h2>Assigned Cases</h2>

    <table className="table table-striped">

        <thead>

            <tr>

                <th>Incident ID</th>

                <th>Citizen</th>

                <th>Title</th>

                <th>Status</th>

                <th>Action</th>

            </tr>

        </thead>

        <tbody>

            {assignments.map((assignment) => (

                <tr key={assignment.assignmentId}>

                    <td>{assignment.incident.incidentId}</td>

                    <td>{assignment.incident.user.firstName}</td>

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
</>
    );
}

export default OfficersList;