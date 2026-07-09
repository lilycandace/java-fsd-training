import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import IncidentService from "../services/incident.service";

function IncidentList() {

    const [incidents, setIncidents] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        IncidentService.getMyIncidents()

            .then((response) => {

                setIncidents(response.data);

            })

            .catch(console.log);

    }, []);
    const filteredIncidents = incidents.filter((incident) =>

        incident.title
            .toLowerCase()
            .includes(search.toLowerCase())

    );
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

            })

            .catch(console.log);

    };
    return (

        <div className="container mt-5">

            <h2>

                My Incidents

            </h2>

            <input

                className="form-control my-4"

                placeholder="Search Incident"

                value={search}

                onChange={(e) => setSearch(e.target.value)}

            />
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
            <table className="table table-striped table-hover">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Title</th>

                        <th>Type</th>

                        <th>Status</th>

                        <th>Date</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredIncidents.map((incident) => (

                            <tr key={incident.incidentId}>

                                <td>

                                    {incident.incidentId}

                                </td>

                                <td>

                                    {incident.title}

                                </td>

                                <td>

                                    {incident.incidentType.incidentTypeName}

                                </td>

                                <td>

                                    <span
                                        className={`badge ${getStatusBadge(
                                            incident.status.statusName
                                        )}`}

                                    >

                                        {incident.status.statusName}

                                    </span>

                                </td>

                                <td>

                                    {new Date(
                                        incident.incidentDate
                                    ).toLocaleDateString()}

                                </td>

                                <td>

                                    <Link

                                        className="btn btn-primary btn-sm me-2"

                                        to={`/incidents/${incident.incidentId}`}

                                    >

                                        View

                                    </Link>

                                    <button

                                        className="btn btn-success btn-sm"

                                        onClick={() =>
                                            downloadReport(
                                                incident.incidentId
                                            )
                                        }

                                    >

                                        PDF

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>
            )}

        </div>

    );
}

export default IncidentList;