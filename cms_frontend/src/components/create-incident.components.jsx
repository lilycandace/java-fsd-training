import { useState } from "react";
import AuthService from "../services/auth.service";

export default function CreateIncident() {

    const [incident, setIncident] = useState({

        title: "",

        description: "",

        incidentType: "",

        location: "",

        incidentDate: "",

        evidence: ""

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setIncident({

            ...incident,

            [name]: value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(incident);

        // IncidentService.createIncident(incident)

    };

    return (

        <div className="container mt-5">

            <h2>Create Incident</h2>

            <form onSubmit={handleSubmit}>

                <label>Incident Title</label>

                <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={incident.title}
                    onChange={handleChange}
                />

                <label className="mt-3">Description</label>

                <textarea
                    className="form-control"
                    rows="5"
                    name="description"
                    value={incident.description}
                    onChange={handleChange}
                />

                <label className="mt-3">Incident Type</label>

                <select
                    className="form-control"
                    name="incidentType"
                    value={incident.incidentType}
                    onChange={handleChange}
                >

                    <option value="">Select</option>

                    <option value="THEFT">Theft</option>

                    <option value="MURDER">Murder</option>

                    <option value="MISSING_PERSON">Missing Person</option>

                    <option value="ABUSE">Report Abuse</option>

                </select>

                <label className="mt-3">Location</label>

                <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={incident.location}
                    onChange={handleChange}
                />

                <label className="mt-3">Incident Date</label>

                <input
                    type="datetime-local"
                    className="form-control"
                    name="incidentDate"
                    value={incident.incidentDate}
                    onChange={handleChange}
                />

                <label className="mt-3">Evidence (Image)</label>

                <input
                    type="file"
                    className="form-control"
                    name="evidence"
                />

                <button
                    className="btn btn-danger mt-4 w-100"
                    type="submit"
                >
                    Report Incident
                </button>

            </form>

        </div>

    );

}