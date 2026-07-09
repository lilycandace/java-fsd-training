import { FaClipboardList } from "react-icons/fa";

export default function CitizenDashboard(){

    return(
        
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
                            <div className="card mt-4">
        
                                <div className="card-body">
        
                                    <h4 className="mb-4">
        
                                        Recent Incidents
        
                                    </h4>
        
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
                                </div>
                            </div>
                            </>
    );

}