import { useState, useEffect } from "react";
import UserService from "../services/user.service";

import pfp1 from "../assets/pfp1.jpg"
import pfp from "../assets/pfp.jpg"

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({

        userId: null,

        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        aadhaarNo: "",
        panNo: "",
        profilePicture: "",
        roleId: ""

    });
    const [errors, setErrors] = useState({});
    const validateField = (name, value) => {

        let error = "";

        switch (name) {

            case "firstName":

                if (value.trim() === "")

                    error = "First name is required";

                else if (!/^[A-Za-z ]+$/.test(value))

                    error = "Only alphabets allowed";

                break;

            case "lastName":

                if (value.trim() === "")

                    error = "Last name is required";

                else if (!/^[A-Za-z ]+$/.test(value))

                    error = "Only alphabets allowed";

                break;

            case "phone":

                if (!/^[6-9]\d{9}$/.test(value))

                    error = "Invalid phone number";

                break;
            case "dob":

                if (value === "") {

                    error = "Date of Birth is required";

                }
                else {

                    const selectedDate = new Date(value);

                    const today = new Date();



                    if (selectedDate > today) {

                        error = "Select accurate DOB";

                    }

                }
                break;

            case "panNo":

                if (value.trim() === "") {

                    error = "PAN Number is required";

                }
                else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value)) {

                    error = "Invalid PAN Number";

                }

                break;

            case "address":

                if (value.trim().length < 10)

                    error = "Address is too short";

                break;

        }

        setErrors(prev => ({

            ...prev,

            [name]: error

        }));

    }

    const calculateAge = (dob) => {

        const birthDate = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();

        const month = today.getMonth() - birthDate.getMonth();

        if (
            month < 0 ||
            (month === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    };
    useEffect(() => {

        UserService.getProfile()

            .then((response) => {

                console.log(response.data);

                setProfile({
                    ...response.data
                });

            })

            .catch((error) => {

                console.log(error);

            });

    }, []);
    const getRoleName = (roleId) => {

        switch (roleId) {

            case 1:
                return "Citizen";

            case 2:
                return "Officer";

            case 3:
                return "StationHead";

            default:
                return "Unknown";

        }

    }
    const maskAadhaar = (aadhaar) => {

        if (!aadhaar) return "";

        return "XXXXXXXX" + aadhaar.slice(-4);

    }

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProfile({
            ...profile,
            [name]: value
        });
        validateField(name, value);


    };
    const handleSubmit = (e) => {
        const hasErrors = Object.values(errors).some(e => e);

        if (hasErrors) {

            alert("Please fix validation errors.");

            return;

        }

        console.log("handleSubmit called");

        e.preventDefault();

        console.log(profile);

        UserService.updateProfile(profile.userId, profile)
            .then(() => {

                alert("Profile updated successfully!");

                return UserService.getProfile();

            })
            .then((response) => {

                setProfile(response.data);

                setIsEditing(false);

            })
            .catch((error) => {

                console.log(error);

            });

    };
    return (



        <div className="container mt-5">

            <div className="card profile-card">

                <div className="card-header bg-primary text-white text-center">

                    <h2 className="mb-1">

                        👤 User Profile

                    </h2>

                    <small>

                        View and update your personal information

                    </small>

                </div>
                <div className="text-center my-4">

                    {profile.profilePicture ? (

                        <img
                            src={pfp}
                            alt="Profile"
                            className="rounded-circle border border-4 border-primary shadow"
                            width="150"
                            height="150"
                            style={{ objectFit: "cover" }}
                        />

                    ) : (

                        <i className="bi bi-person-circle display-1 text-primary"></i>

                    )}

                    <h4 className="mt-3">

                        {profile.firstName} {profile.lastName}

                    </h4>

                    <span className="badge bg-primary">

                        {getRoleName(profile.roleId)}

                    </span>

                </div>
                <div className="card mb-4">

                    <div className="card-header">

                        <h5>

                            Personal Information

                        </h5>

                    </div>
                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                <div className="col-md-6">

                                    <label className="form-label">
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                        name="firstName"
                                        value={profile.firstName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                    <div className="invalid-feedback">

                                        {errors.firstName}

                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Middle Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="middleName"
                                        value={profile.middleName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />

                                </div>

                            </div>

                            <div className="row mt-3">

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                        name="lastName"
                                        value={profile.lastName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                    <div className="invalid-feedback">

                                        {errors.lastName}

                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                        value={profile.email}
                                        readOnly
                                    />
                                    <div className="invalid-feedback">

                                        {errors.email}

                                    </div>

                                </div>

                            </div>

                            <div className="row mt-3">

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                    <div className="invalid-feedback">

                                        {errors.phone}

                                    </div>


                                </div>

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Date of Birth
                                    </label>

                                    <input
                                        type="date"
                                        className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                                        name="dob"
                                        value={profile.dob}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                    <div className="invalid-feedback">

                                        {errors.dob}

                                    </div>


                                </div>

                            </div>


                            <div className="mt-3">

                                <label className="form-label">
                                    Address
                                </label>

                                <textarea
                                    rows="3"
                                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                                    name="address"
                                    value={profile.address}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                                <div className="invalid-feedback">

                                    {errors.address}

                                </div>

                            </div>


                            <div className="row mt-3">

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Age
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={profile.dob ? calculateAge(profile.dob) : ""}
                                        readOnly
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Role
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={getRoleName(profile.roleId)}
                                        readOnly
                                    />

                                </div>

                            </div>

                            <div className="row mt-3">

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Aadhaar Number
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={maskAadhaar(profile.aadhaarNo)}
                                        readOnly
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label className="form-label">
                                        PAN Number
                                    </label>

                                    <input
                                        type="text"
                                        className={`form-control ${errors.panNo ? "is-invalid" : ""}`}
                                        name="panNo"
                                        value={profile.panNo}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                    <div className="invalid-feedback">

                                        {errors.panNo}

                                    </div>

                                </div>

                            </div>
                            <button
                                type="button"
                                className="btn btn-warning mt-4 me-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsEditing(true);
                                }}
                                hidden={isEditing}
                            >
                                Edit Profile
                            </button>

                            <button
                                type="submit"
                                className="btn btn-success mt-4"
                                hidden={!isEditing}
                            >
                                Save Changes
                            </button>

                        </form>

                    </div>
                </div>
            </div>

        </div>


    );

}