import { useState } from "react";
import IncidentService from "../services/incident.service";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function CreateIncident() {
const navigate = useNavigate();
const auth = useSelector((state) => state.auth);
    const [incident, setIncident] = useState({

        incidentType: "",
        title: "",
        description: "",
        location: "",
        incidentDate: "",

        propertyStolen: "",
        estimatedValue: "",
        suspectKnown: "",

        victimName: "",
        weaponUsed: "",
        witnesses: "",

        missingPersonName: "",
        age: "",
        gender: "",
        lastSeenLocation: "",
        lastSeenDate: "",

        abuseType: "",
        relationship: "",
        immediateDanger: "",

        damagedProperty: "",
        damageCost: "",

        graffitiLocation: "",
        offensiveContent: ""

    });

    const incidentTypeMap = {

    theft: 1,
    murder: 2,
    missing_person: 3,
    abuse: 4,
    lost_property: 5,
    petit_larceny: 6,
    criminal_mischief: 7,
    graffiti: 8

};

    const handleChange = (e) => {

        const { name, value } = e.target;

        setIncident({

            ...incident,

            [name]: value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        let fullDescription = incident.description;

        if (incident.incidentType === "theft") {

            fullDescription +=
                `

Property Stolen : ${incident.propertyStolen}
Estimated Value : ${incident.estimatedValue}
Suspect Known : ${incident.suspectKnown}`;

        }

        if (incident.incidentType === "murder") {

            fullDescription +=
                `

Victim Name : ${incident.victimName}
Weapon Used : ${incident.weaponUsed}
Witnesses : ${incident.witnesses}`;

        }

        if (incident.incidentType === "missing_person") {

            fullDescription +=
                `

Missing Person : ${incident.missingPersonName}
Age : ${incident.age}
Gender : ${incident.gender}
Last Seen : ${incident.lastSeenLocation}
Last Seen Date : ${incident.lastSeenDate}`;

        }

        if (incident.incidentType === "abuse") {

            fullDescription +=
                `

Victim : ${incident.victimName}
Abuse Type : ${incident.abuseType}
Relationship : ${incident.relationship}
Immediate Danger : ${incident.immediateDanger}`;

        }

     const payload = {
    incidentTypeId: incidentTypeMap[incident.incidentType],
    title: incident.title,
    description: fullDescription,
    location: incident.location
};

        IncidentService.createIncident(payload)
    .then(() => {

        alert("Incident reported successfully!");

        navigate("/dashboard");

    })
    .catch((error) => {

        console.log(error);

        alert("Unable to create incident.");

    });

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

                

                <label className="mt-3">Incident Type</label>

                <select
                    className="form-control"
                    name="incidentType"
                    value={incident.incidentType}
                    onChange={handleChange}
                >

                    <option value="">Select</option>

                    <option value="theft">Theft</option>

                    <option value="murder">Murder</option>

                    <option value="missing_person">Missing Person</option>

                    <option value="abuse">Report Abuse</option>

                    <option value="lost property">Lost Property</option>

                    <option value="petit larceny">Petit Larceny</option>

                    <option value="criminal mischief">Criminal Mischief</option>

                    <option value="graffiti">Graffiti</option>

                </select>
                {incident.incidentType === "theft" && (

                    <div className="mt-3">

                        <label>Property Stolen</label>

                        <input
                            type="text"
                            className="form-control"
                            name="propertyStolen"
                            value={incident.propertyStolen}
                            onChange={handleChange}
                        />

                        <label className="mt-3">Estimated Value</label>

                        <input
                            type="number"
                            className="form-control"
                            name="estimatedValue"
                            value={incident.estimatedValue}
                            onChange={handleChange}
                        />

                        <label className="mt-3">Was the suspect known?</label>

                        <select
                            className="form-control"
                            name="suspectKnown"
                            value={incident.suspectKnown}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                )}
                {incident.incidentType === "murder" && (

                    <div className="mt-3">

                        <label>Victim Name</label>

                        <input
                            type="text"
                            className="form-control"
                            name="victimName"
                            value={incident.victimName}
                            onChange={handleChange}
                        />

                        <label className="mt-3">Weapon Used</label>

                        <input
                            type="text"
                            className="form-control"
                            name="weaponUsed"
                            value={incident.weaponUsed}
                            onChange={handleChange}
                        />

                        <label className="mt-3">Number of witnesses</label>

                        <input
                            type="number"
                            className="form-control"
                            name="witnesses"
                            value={incident.witnesses}
                            onChange={handleChange}
                        />

                    </div>

                )}
                {incident.incidentType === "missing_person" && (

                    <div className="mt-3">

                        <label>Missing Person Name</label>

                        <input
                            type="text"
                            className="form-control"
                            name="missingPersonName"
                            value={incident.missingPersonName}
                            onChange={handleChange}
                        />
                        <label className="mt-3">Age</label>

                        <input
                            type="number"
                            className="form-control"
                            name="age"
                            value={incident.age}
                            onChange={handleChange}
                        />
                        <label className="mt-3">Gender</label>

                        <select
                            className="form-control"
                            name="gender"
                            value={incident.gender}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Preferred_not">Prefer not to say</option>
                        </select>

                        <label className="mt-3">Last seen location</label>

                        <input
                            type="text"
                            className="form-control"
                            name="lastSeenLocation"
                            value={incident.lastSeenLocation}
                            onChange={handleChange}
                        />
                        <label className="mt-3">Last seen date</label>

                        <input
                            type="date"
                            className="form-control"
                            name="lastSeenDate"
                            value={incident.lastSeenDate}
                            onChange={handleChange}
                        />



                    </div>

                )}
                {incident.incidentType === "abuse" && (

                    <div className="mt-3">

                        <label>Vicitm Name</label>

                        <input
                            type="text"
                            className="form-control"
                            name="victimName"
                            value={incident.victimName}
                            onChange={handleChange}
                        />

                        <label className="mt-3">Abuse Type</label>

                        <select
                            className="form-control"
                            name="abuseType"
                            value={incident.abuseType}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Sexual_violence">Sexual Violence</option>
                            <option value="Physical_violence">Physical Violence</option>
                            <option value="Verbal_abuse">Verbal Abuse</option>
                        </select>

                        <label className="mt-3">Relationship to the victim?</label>
                        <input
                            type="text"
                            className="form-control"
                            name="relationship"
                            value={incident.relationship}
                            onChange={handleChange}
                        />

                        <label className="mt-3">Immediate Danger?</label>

                        <select
                            className="form-control"
                            name="immediateDanger"
                            value={incident.immediateDanger}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                )}


                <label className="mt-3">Location</label>

                <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={incident.location}
                    onChange={handleChange}
                />
                <label className="mt-3">Additional Information</label>

                <textarea
                    className="form-control"
                    rows="5"
                    name="description"
                    value={incident.description}
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