import { useState, useEffect } from "react";
import userService from "../services/user.service";
import incidentService from "../services/incident.service";
import { Link } from "react-router-dom";

export default function Management() {

    const [activeTab, setActiveTab] = useState("officers");

    const [officers, setOfficers] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [users, setUsers] = useState([]);
    const [incidents, setIncidents] = useState([]);

    const [newOfficer, setNewOfficer] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        dob: "",
        aadhaarNo: "",
        panNo: "",
        profilePicture: "",
        roleId: 2
    });
    const loadOfficers = () => {

        userService.getAllOfficers()

            .then((response) => {

                setOfficers(response.data);

            })

            .catch(console.log);

    };
    const loadUsers = () => {

        userService.getAllCitizens()

            .then(res => setUsers(res.data))

            .catch(console.log);

    };
    const loadIncidents = () => {

        incidentService.getAllIncidents()

            .then(res => setIncidents(res.data))

            .catch(console.log);

    };

    useEffect(() => {

        loadOfficers();

        loadUsers();

        loadIncidents();

    }, []);
    const handleSubmit = (e) => {

        e.preventDefault();

        userService.addOfficer(newOfficer)

            .then(() => {

                alert("Officer added successfully!");

                setShowForm(false);

                loadOfficers();

            });
        setNewOfficer({

            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            password: "",
            phone: "",
            address: "",
            dob: "",
            aadhaarNo: "",
            panNo: "",
            profilePicture: "",
            roleId: 2

        });

    };
    const handleDelete = (id) => {

        if (!window.confirm("Delete this officer?")) return;

        userService.deleteOfficer(id)

            .then(() => {
                alert("Officer deleted successfully!");


                loadOfficers();

            });

    };
    const handleChange = (e) => {

        const { name, value } = e.target;

        setNewOfficer({

            ...newOfficer,

            [name]: value

        });

    };

    return (

        <div className="container mt-4">

            <h2>Management</h2>

            <ul className="nav nav-tabs mt-4">

                <li className="nav-item">

                    <button
                        className={`nav-link ${activeTab === "officers" ? "active" : ""}`}
                        onClick={() => setActiveTab("officers")}
                    >
                        Officers
                    </button>

                </li>

                <li className="nav-item">

                    <button
                        className={`nav-link ${activeTab === "users" ? "active" : ""}`}
                        onClick={() => setActiveTab("users")}
                    >
                        Users
                    </button>

                </li>

                <li className="nav-item">

                    <button
                        className={`nav-link ${activeTab === "incidents" ? "active" : ""}`}
                        onClick={() => setActiveTab("incidents")}
                    >
                        Incidents
                    </button>

                </li>

            </ul>

            <div className="mt-4">

                {activeTab === "officers" && (
                    <>
                        <div className="d-flex justify-content-between align-items-center">

                            <h3>Officer Management</h3>

                            <button
                                className="btn btn-success"
                                onClick={() => setShowForm(!showForm)}
                            >
                                + Add Officer
                            </button>

                        </div>

                        {showForm && (

                            <div className="card shadow mt-4">

                                <div className="card-header bg-primary text-white">

                                    <h4>Add New Officer</h4>

                                </div>

                                <div className="card-body">

                                    <form onSubmit={handleSubmit}>

                                        <div className="row">

                                            <div className="col-md-4">

                                                <label className="form-label">First Name</label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="firstName"
                                                    value={newOfficer.firstName}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>

                                            <div className="col-md-4">

                                                <label className="form-label">Middle Name</label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="middleName"
                                                    value={newOfficer.middleName}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            <div className="col-md-4">

                                                <label className="form-label">Last Name</label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="lastName"
                                                    value={newOfficer.lastName}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>

                                        </div>

                                        <div className="row mt-3">

                                            <div className="col-md-6">

                                                <label className="form-label">Email</label>

                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    value={newOfficer.email}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>

                                            <div className="col-md-6">

                                                <label className="form-label">Temporary Password</label>

                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    value={newOfficer.password}
                                                    onChange={handleChange}
                                                    placeholder="Officer@123"
                                                    required
                                                />

                                            </div>

                                        </div>

                                        <div className="row mt-3">

                                            <div className="col-md-6">

                                                <label className="form-label">Phone Number</label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="phone"
                                                    value={newOfficer.phone}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>

                                            <div className="col-md-6">

                                                <label className="form-label">Date of Birth</label>

                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="dob"
                                                    value={newOfficer.dob}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>

                                        </div>

                                        <div className="mt-3">

                                            <label className="form-label">Address</label>

                                            <textarea
                                                rows="3"
                                                className="form-control"
                                                name="address"
                                                value={newOfficer.address}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                        <div className="row mt-3">

                                            <div className="col-md-6">

                                                <label className="form-label">PAN Number</label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="panNo"
                                                    value={newOfficer.panNo}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>

                                            <div className="col-md-6">

                                                <label className="form-label">Aadhaar Number</label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="aadhaarNo"
                                                    value={newOfficer.aadhaarNo}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>

                                        </div>

                                        <div className="mt-3">

                                            <label className="form-label">Profile Picture</label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                name="profilePicture"
                                                value={newOfficer.profilePicture}
                                                onChange={handleChange}
                                                placeholder="Image URL or file path"
                                            />

                                        </div>

                                        <div className="d-flex justify-content-end gap-2 mt-4">

                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => setShowForm(false)}
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                type="submit"
                                                className="btn btn-success"
                                            >
                                                Create Officer
                                            </button>

                                        </div>

                                    </form>

                                </div>

                            </div>

                        )}

                        <table className="table table-striped mt-4">

                            <thead>

                                <tr>

                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>Phone</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {officers.map((officer) => (

                                    <tr key={officer.userId}>

                                        <td>

                                            {officer.firstName} {officer.lastName}

                                        </td>

                                        <td>{officer.email}</td>

                                        <td>{officer.phone}</td>

                                        <td>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(officer.userId)}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>


                    </>)}

                {activeTab === "users" && (
                    <>
                        <div>User Management</div>
                        <table className="table">

                            <thead>

                                <tr>

                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>Phone</th>

                                </tr>

                            </thead>

                            <tbody>

                                {users.map(user => (

                                    <tr key={user.userId}>

                                        <td>{user.firstName} {user.lastName}</td>

                                        <td>{user.email}</td>

                                        <td>{user.phone}</td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>
                    </>
                )}

                {activeTab === "incidents" && (
                    <>
                        <div>Incident Management</div>
                        <table className="table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Citizen</th>

                                    <th>Title</th>

                                    <th>Status</th>

                                    <th>Assign</th>

                                </tr>

                            </thead>

                            <tbody>

                                {incidents.map(i => (
                                    

                                    <tr key={i.incidentId}>

                                        <td>{i.incidentId}</td>

                                        {/* <td>{i.user.firstName}</td> */}
                                        <td>

                                            {i.user.firstName} {i.user.lastName}

                                        </td>

                                        <td>{i.title}</td>

                                        <td>{i.status.statusName}</td>

                                        <td>

                                            <Link
                                                className="btn btn-primary btn-sm me-2"
                                                to={`/incidents/${i.incidentId}`}
                                            >

                                                View

                                            </Link>

                                            <td>{i.incidentId}</td>

                                            {i.status.statusName === "initiated" && (
                                                

                                                <Link
                                                    className="btn btn-success btn-sm"
                                                    to={`/assign/${i.incidentId}`}
                                                >

                                                    Assign

                                                </Link>

                                            )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </>
                )}

            </div>

        </div>

    );

}