import { useState } from "react";
import IncidentService from "../services/incident.service";
import { FaCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function CreateIncident() {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const [errors, setErrors] = useState({});
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
    const validateIncident = (name, value) => {

        let error = "";

        switch (name) {

            case "incidentType":

                if (value === "") {

                    error = "Please select an incident type";

                }

                break;

            case "title":

                if (value.trim().length < 5) {

                    error = "Title should contain at least 5 characters";

                }

                break;

            case "description":

                if (value.trim().length < 20) {

                    error = "Description should contain at least 20 characters";

                }

                break;

            case "location":

                if (value.trim().length < 5) {

                    error = "Location is required";

                }

                break;
            case "estimatedValue":

                if (Number(value) <= 0) {

                    error = "Enter a valid amount";

                }

                break;
            case "propertyStolen":

                if (value.trim() == "") {

                    error = "Property name is required";

                }

                break;
            case "victimName":

                if (value.trim() == "") {

                    error = "Victim name is required";

                }

                break;
            case "weaponUsed":

                if (value.trim() == "") {

                    error = "Weapon details required";

                }

                break;
            case "missingPersonName":

                if (value.trim() == "") {

                    error = "Missing person name required";

                }

                break;
            case "age":

                if (Number(value) <= 0) {

                    error = "Enter valid age";

                }

                break;
            case "lastSeenLocation":

                if (value.trim() == "") {

                    error = "Last seen location required";

                }

                break;
            case "lastSeenDate":

                if (value === "") {

                    error = "Last seen date is required";

                }
                else {

                    const selectedDate = new Date(value);

                    const today = new Date();

                    // Remove time portion for accurate comparison
                    today.setHours(0, 0, 0, 0);

                    if (selectedDate > today) {

                        error = "Last seen date cannot be in the future";

                    }

                }

                break;
            case "incidentDate":

                if (value === "") {

                    error = "Estimated Incident date is required";

                }
                else {

                    const selectedDate = new Date(value);

                    const today = new Date();

                    // Remove time portion for accurate comparison
                    today.setHours(0, 0, 0, 0);

                    if (selectedDate > today) {

                        error = "Estimated date cannot be in the future";

                    }

                }

                break;
            case "abuseType":

                if (value == "") {

                    error = "Select abuse type";

                }

                break;
            case "relationship":

                if (value.trim() == "") {

                    error = "Relationship required";

                }

                break;
            case "damageCost":

                if (Number(value) <= 0) {

                    error = "Enter valid cost";

                }

                break;
            case "graffitiLocation":

                if (value.trim() == "") {

                    error = "Location required";

                }

                break;


        }    setErrors(prev => ({
            ...prev,
            [name]: error
        }));

    }

    const handleChange = (e) => {

        const { name, value } = e.target;

        setIncident({

            ...incident,

            [name]: value

        });
        validateIncident(name, value);

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

                toast.success("Incident reported successfully!");

                navigate("/dashboard");

            })
            .catch((error) => {

                console.log(error);

                toast.warning("Unable to create incident.");

            });

    };

    return (

        <div className="container mt-4">

            <div className="card shadow-lg">

                <div className="card-header bg-danger text-white">

                    <h3>

                        🚔 Report Incident

                    </h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6">

                                <label>Incident Title</label>

                                <input
                                    type="text"
                                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                    name="title"
                                    placeholder="eg. Car Window Broken"
                                    value={incident.title}
                                    onChange={handleChange}
                                />

                                <div className="invalid-feedback">
                                    {errors.title}
                                </div>

                            </div>

                            <div className="col-md-6">

                                <label>Incident Type</label>

                                <select
                                    className={`form-control ${errors.incidentType ? "is-invalid" : ""}`}
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

                                <div className="invalid-feedback">
                                    {errors.incidentType}
                                </div>

                            </div>

                        </div>
                        {incident.incidentType === "theft" && (

                            <div className="card mt-4">

                                <div className="card-header bg-light">

                                    <h5>Theft Details</h5>

                                </div>

                                <div className="card-body">

                                    <div className="row">

                                        <div className="col-md-6">

                                            <label>Property Stolen</label>

                                            <input
                                                type="text"
                                                className={`form-control ${errors.propertyStolen ? "is-invalid" : ""}`}
                                                name="propertyStolen"
                                                placeholder="eg. Navy Blue Titan Watch"
                                                value={incident.propertyStolen}
                                                onChange={handleChange}
                                            />

                                            <div className="invalid-feedback">
                                                {errors.propertyStolen}
                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <label>Estimated Value</label>

                                            <input
                                                type="number"
                                                className={`form-control ${errors.estimatedValue ? "is-invalid" : ""}`}
                                                name="estimatedValue"
                                                placeholder="eg. 10000"
                                                value={incident.estimatedValue}
                                                onChange={handleChange}
                                            />

                                            <div className="invalid-feedback">
                                                {errors.estimatedValue}
                                            </div>

                                        </div>

                                    </div>

                                    <div className="row mt-3">

                                        <div className="col-md-6">

                                            <label>Was the suspect known?</label>

                                            <select
                                                className="form-select"
                                                name="suspectKnown"
                                                value={incident.suspectKnown}
                                                onChange={handleChange}
                                            >

                                                <option value="">Select</option>

                                                <option value="Yes">Yes</option>

                                                <option value="No">No</option>

                                            </select>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )}
                        {incident.incidentType === "murder" && (
                            <div className="card mt-4">

                                <div className="card-header bg-light">

                                    <h5>Murder Details</h5>

                                </div>

                                <div className="card-body">

                                    <div className="row">

                                        <div className="col-md-6">

                                            <label>Victim Name</label>

                                            <input
                                                type="text"
                                                className={`form-control ${errors.victimName ? "is-invalid" : ""}`}
                                                name="victimName"
                                                value={incident.victimName}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">

                                                {errors.victimName}

                                            </div>
                                        </div>

                                        <div className="col-md-6">

                                            <label className="mt-3">Weapon Used</label>

                                            <input
                                                type="text"
                                                className={`form-control ${errors.weaponUsed ? "is-invalid" : ""}`}
                                                name="weaponUsed"
                                                placeholder="enter if known, if not nil"
                                                value={incident.weaponUsed}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">

                                                {errors.weaponUsed}

                                            </div>
                                        </div>

                                    </div>

                                    <div className="row mt-3">

                                        <div className="col-md-6">

                                            <label >Number of witnesses</label>

                                            <input
                                                type="number"
                                                className="form-control"
                                                name="witnesses"
                                                placeholder="The number of witnesses present if known"
                                                value={incident.witnesses}
                                                onChange={handleChange}
                                            />

                                        </div>

                                    </div>
                                </div>
                            </div>


                        )}
                        {incident.incidentType === "missing_person" && (
                            <div className="card mt-4">

                                <div className="card-header bg-light">

                                    <h5>Missing Person Details</h5>

                                </div>

                                <div className="card-body">

                                    <div className="row">

                                        <div className="col-md-6">

                                            <label>Missing Person Name</label>

                                            <input
                                                type="text"
                                                className={`form-control ${errors.missingPersonName ? "is-invalid" : ""}`}
                                                name="missingPersonName"
                                                value={incident.missingPersonName}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">

                                                {errors.missingPersonName}

                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <label >Age</label>

                                            <input
                                                type="number"
                                                className={`form-control ${errors.age ? "is-invalid" : ""}`}
                                                name="age"
                                                value={incident.age}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">

                                                {errors.age}

                                            </div>
                                        </div>

                                    </div>
                                    <div className="row mt-3">

                                        <div className="col-md-6">

                                            <label >Gender</label>

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
                                        </div>

                                    </div>
                                </div>

                                <div className="row mt-3">

                                    <div className="col-md-6">

                                        <label>Last Seen Location</label>

                                        <input
                                            type="text"
                                            className={`form-control ${errors.lastSeenLocation ? "is-invalid" : ""}`}
                                            name="lastSeenLocation"
                                            value={incident.lastSeenLocation}
                                            onChange={handleChange}
                                        />

                                        <div className="invalid-feedback">
                                            {errors.lastSeenLocation}
                                        </div>

                                    </div>

                                    <div className="col-md-6">

                                        <label>Last Seen Date</label>

                                        <input
                                            type="date"
                                            className={`form-control ${errors.lastSeenDate ? "is-invalid" : ""}`}
                                            name="lastSeenDate"
                                            value={incident.lastSeenDate}
                                            onChange={handleChange}
                                        />

                                        <div className="invalid-feedback">
                                            {errors.lastSeenDate}
                                        </div>

                                    </div>

                                </div>


                            </div>

                        )}
                        {incident.incidentType === "abuse" && (

                            <div className="card mt-4">

                                <div className="card-header bg-light">

                                    <h5>🚨 Abuse Details</h5>

                                </div>

                                <div className="card-body">

                                    <div className="row">

                                        <div className="col-md-6">

                                            <label>Victim Name</label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                name="victimName"
                                                value={incident.victimName}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="col-md-6">

                                            <label>Abuse Type</label>

                                            <select
                                                className={`form-select ${errors.abuseType ? "is-invalid" : ""}`}
                                                name="abuseType"
                                                value={incident.abuseType}
                                                onChange={handleChange}
                                            >

                                                <option value="">Select</option>

                                                <option value="Sexual_violence">
                                                    Sexual Violence
                                                </option>

                                                <option value="Physical_violence">
                                                    Physical Violence
                                                </option>

                                                <option value="Verbal_abuse">
                                                    Verbal Abuse
                                                </option>

                                            </select>

                                            <div className="invalid-feedback">
                                                {errors.abuseType}
                                            </div>

                                        </div>

                                    </div>

                                    <div className="row mt-3">

                                        <div className="col-md-6">

                                            <label>Relationship to the Victim</label>

                                            <input
                                                type="text"
                                                className={`form-control ${errors.relationship ? "is-invalid" : ""}`}
                                                name="relationship"
                                                value={incident.relationship}
                                                onChange={handleChange}
                                            />

                                            <div className="invalid-feedback">
                                                {errors.relationship}
                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <label>Immediate Danger?</label>

                                            <select
                                                className="form-select"
                                                name="immediateDanger"
                                                value={incident.immediateDanger}
                                                onChange={handleChange}
                                            >

                                                <option value="">Select</option>

                                                <option value="Yes">Yes</option>

                                                <option value="No">No</option>

                                            </select>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )}


                        <div className="row mt-3">

                            <div className="col-md-6">

                                <label>Location</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    value={incident.location}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6">

                                <label>Incident Date</label>

                                <input
                                    type="datetime-local"
                                    className={`form-control ${errors.incidentDate ? "is-invalid" : ""}`}
                                    name="incidentDate"
                                    value={incident.incidentDate}
                                    onChange={handleChange}
                                    
                                />
                                <div className="invalid-feedback">
                                            {errors.incidentDate}
                                        </div>

                            </div>
                            

                        </div>
                        <label className="mt-3">Additional Information</label>

                        <textarea
                            className="form-control"
                            rows="5"
                            name="description"
                            value={incident.description}
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

            </div>

        </div>

        // </div>

    );

}