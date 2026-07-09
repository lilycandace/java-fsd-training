import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import UserService from "../services/user.service";
import IncidentService from "../services/incident.service";
import AssignmentService from "../services/assignment.service";
import { toast } from "react-toastify";

export default function AssignIncident() {

    const { id } = useParams();

    const navigate = useNavigate();

    const auth = useSelector(state => state.auth);

    const [incident, setIncident] = useState({});

    const [officers, setOfficers] = useState([]);
    const [assignment, setAssignment] = useState({

        incidentId: id,

        officerId: "",

        assignedById: auth.userId

    });

    const [selectedOfficer, setSelectedOfficer] = useState("");

    useEffect(() => {

        IncidentService.getIncident(id)

            .then(res => {

                setIncident(res.data);

            })

            .catch(console.log);

        // UserService.getAllOfficers()

        //     .then(res => {

        //         setOfficers(res.data);

        //     })

        //     .catch(console.log);

        AssignmentService.getOfficerWorkloads()

            .then((response) => {


                console.log("API Response:", response.data);

                console.log("First Officer:", response.data[0]);

                console.log("Officer ID:", response.data[0].officerId);



                setOfficers(response.data);

                if (response.data.length > 0) {

                    setAssignment(prev => ({

                        ...prev,

                        officerId: response.data[0].officerId

                    }));

                }

            })
            .catch(console.log)

    }, [id]);
    const handleChange = (e) => {

        const { name, value } = e.target;

        setAssignment(prev => ({
            ...prev,
            [name]: value
        }));

    };
    const handleSubmit = (e) => {

        e.preventDefault();

        if (!assignment.officerId) {

            toast.warning("Please select an officer.");

            return;

        }

        AssignmentService.assignOfficer({

            incidentId: Number(id),

            officerId: Number(assignment.officerId),

            assignedById: auth.userId

        })

            .then(() => {

                toast.success("Officer assigned successfully.");

                navigate("/management");

            })

            .catch(console.log);

    };

    console.log("Assignment:", assignment);
    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h3>Assign Incident</h3>

                </div>

                <div className="card-body">

                    <p>

                        <strong>Incident ID :</strong> {incident.incidentId}

                    </p>

                    <p>

                        <strong>Title :</strong> {incident.title}

                    </p>

                    <p>

                        <strong>Citizen :</strong>{" "}

                        {incident.user?.firstName} {incident.user?.lastName}

                    </p>

                    <p>

                        <strong>Status :</strong>{" "}

                        {incident.status?.statusName}

                    </p>

                    <form onSubmit={handleSubmit}>

                        <label className="form-label mt-3">

                            Select Officer

                        </label>

                        <select
                            className="form-select"
                            name="officerId"
                            value={assignment.officerId}
                            onChange={handleChange}
                        >
                            <option value="">Select Officer</option>

                            {officers.map((officer) => (
                                <option
                                    key={officer.officerId}
                                    value={officer.officerId}
                                >
                                    {officer.officerName} ({officer.activeCases} Active Cases)
                                </option>
                            ))}
                        </select>

                        <div className="mt-4">

                            <button

                                className="btn btn-success"

                                type="submit"

                            >

                                Assign Officer

                            </button>

                            <button

                                type="button"

                                className="btn btn-secondary ms-2"

                                onClick={() => navigate("/management")}

                            >

                                Cancel

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}