import { useState } from "react";
import AuthService from "../services/auth.service";

export default function Profile() {

    const [profile, setProfile] = useState({

        firstName: "",
        middleName: "",
        lastName: "",

        email: "",

        phone: "",

        address: "",

        dob: "",

        age: "",

        aadhaarNo: "",

        panNo: ""

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

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "dob") {

            setProfile({

                ...profile,

                dob: value,

                age: calculateAge(value)

            });

        } else {

            setProfile({

                ...profile,

                [name]: value

            });

        }

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(profile);

        // ProfileService.updateProfile(profile)

    };

    return (

        <div className="container mt-5">

            <h2>My Profile</h2>

            <form onSubmit={handleSubmit}>

                <label>First Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                />

                <label className="mt-3">Middle Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="middleName"
                    value={profile.middleName}
                    onChange={handleChange}
                />

                <label className="mt-3">Last Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                />

                <label className="mt-3">Email</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                />

                <label className="mt-3">Phone</label>
                <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                />

                <label className="mt-3">Address</label>
                <textarea
                    className="form-control"
                    rows="3"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                />

                <label className="mt-3">Date of Birth</label>
                <input
                    type="date"
                    className="form-control"
                    name="dob"
                    value={profile.dob}
                    onChange={handleChange}
                />

                <label className="mt-3">Age</label>
                <input
                    type="number"
                    className="form-control"
                    value={profile.age}
                    readOnly
                />

                <label className="mt-3">Aadhaar Number</label>
                <input
                    type="text"
                    className="form-control"
                    name="aadhaarNo"
                    value={profile.aadhaarNo}
                    onChange={handleChange}
                />

                <label className="mt-3">PAN Number</label>
                <input
                    type="text"
                    className="form-control"
                    name="panNo"
                    value={profile.panNo}
                    onChange={handleChange}
                />

                <button
                    className="btn btn-primary mt-4 w-100"
                    type="submit"
                >
                    Update Profile
                </button>

            </form>

        </div>

    );

}