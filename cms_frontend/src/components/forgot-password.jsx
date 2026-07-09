import { useState } from "react";
import userService from "../services/user.service";
import { useNavigate } from "react-router-dom";
import "../styles/forgotpass.css";

export default function ForgotPassword() {
    const [form, setForm] = useState({

        email: "",

        aadhaarLast4: "",

        newPassword: "",

        confirmPassword: ""

    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({

            ...form,

            [name]: value

        });

        validateField(name, value);

    };
    const validateField = (name, value) => {

        let error = "";


        switch (name) {
            case "email":

                if (value.trim() === "") {

                    error = "Email is required";

                }

                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {

                    error = "Invalid Email";

                }

                break;
            case "newPassword":

                if (value.length < 8) {

                    error = "Minimum 8 characters";

                }

                else if (!/(?=.*[A-Z])/.test(value)) {

                    error = "One uppercase required";

                }

                else if (!/(?=.*[0-9])/.test(value)) {

                    error = "One number required";

                }

                else if (!/(?=.*[@$!%*?&])/.test(value)) {

                    error = "One special character required";

                }

                break;
            case "confirmPassword":

                if (value !== form.newPassword) {

                    error = "Passwords do not match";

                }

                break;
            case "aadhaarLast4":

                if (value.trim() === "") {

                    error = "Last 4 digits are required";

                }

                else if (!/^\d{4}$/.test(value)) {

                    error = "Enter exactly 4 digits";

                }

                break;




        }
    }
    const handleSubmit = (e) => {

        e.preventDefault();

        if (Object.values(errors).some(err => err)) {

            return;

        }

        userService.forgotPassword({

            email: form.email,

            aadhaarLast4: form.aadhaarLast4,

            newPassword: form.newPassword

        })

            .then((response) => {

                alert(response.data);

                navigate("/login");

            })

            .catch((error) => {

                console.log(error);

                if (error.response) {

                    alert(error.response.data);

                } else {

                    alert("Something went wrong.");

                }

            });

    };
    return (
        <div className="forgot-page">
        <div className="container mt-5">
        <form className="form1" onSubmit={handleSubmit}>

            {/* Email */}

            <label>Email</label>

            <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                name="email"
                value={form.email}
                onChange={handleChange}
            />

            <div className="invalid-feedback">
                {errors.email}
            </div>

            {/* Aadhaar Verification */}

            <label className="mt-3">
                Last 4 digits of Aadhaar
            </label>

            <input
                type="text"
                className={`form-control ${errors.aadhaarLast4 ? "is-invalid" : ""}`}
                name="aadhaarLast4"
                value={form.aadhaarLast4}
                onChange={handleChange}
                maxLength="4"
            />

            <div className="invalid-feedback">
                {errors.aadhaarLast4}
            </div>

            {/* New Password */}

            <label className="mt-3">
                New Password
            </label>

            <input
                type="password"
                className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
            />

            <div className="invalid-feedback">
                {errors.newPassword}
            </div>

            {/* Confirm Password */}

            <label className="mt-3">
                Confirm Password
            </label>

            <input
                type="password"
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
            />

            <div className="invalid-feedback">
                {errors.confirmPassword}
            </div>

            <button
                className="btn btn-primary w-100 mt-4"
                type="submit"
            >
                Reset Password
            </button>

        </form>
        </div></div>
    );

}