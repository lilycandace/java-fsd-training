import { useState, useEffect } from "react";
import UserService from "../services/user.service";

import pfp1 from "../assets/pfp1.jpg"

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

    };
    const handleSubmit = (e) => {

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

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h3>User Profile</h3>

                </div>
                {profile.profilePicture ? (
                    <img
                        src={profile.profilePicture || pfp1}
                        // src={pfp1}

                        alt="Profile"
                        className="rounded-circle border"
                        width="150"
                        height="150"
                        style={{ objectFit: "cover" }}
                    />
                ) : (
                    <i className="bi bi-person-circle display-1 text-secondary"></i>
                )}

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6">

                                <label className="form-label">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={profile.firstName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />

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
                                    className="form-control"
                                    name="lastName"
                                    value={profile.lastName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />

                            </div>

                            <div className="col-md-6">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    value={profile.email}
                                    readOnly
                                />

                            </div>

                        </div>

                        <div className="row mt-3">

                            <div className="col-md-6">

                                <label className="form-label">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />

                            </div>

                            <div className="col-md-6">

                                <label className="form-label">
                                    Date of Birth
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="dob"
                                    value={profile.dob}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />

                            </div>

                        </div>


                        <div className="mt-3">

                            <label className="form-label">
                                Address
                            </label>

                            <textarea
                                rows="3"
                                className="form-control"
                                name="address"
                                value={profile.address}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />

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
                                    className="form-control"
                                    name="panNo"
                                    value={profile.panNo}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />

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


    );

}