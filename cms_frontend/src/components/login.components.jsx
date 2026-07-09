import { useState } from "react";
import AuthService from "../services/auth.service";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { loginSuccess } from "../redux/slices/authSlice";
import "../styles/login.css";
import { toast } from "react-toastify";
export default function Login() {

    const [login, setLogin] = useState({
        email: "",
        password: ""
    });
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleChange = (e) => {

        const { name, value } = e.target;

        setLogin({
            ...login,
            [name]: value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        AuthService.login(login)

            .then((response) => {

                console.log(response.data);

                dispatch(loginSuccess(response.data));

                localStorage.setItem(
                    "auth",
                    JSON.stringify(response.data)
                );
                toast.success("Logged in successfully!");

                navigate("/dashboard");

            })

            .catch((error) => {

                console.log(error.response?.data);

                alert(
                    error.response?.data?.message || "Login failed"
                );

            });
    };

    return (
        <div className="login-page">
        <div className="container mt-5">
            
                <div className="login-card">
                    <form className="form1" onSubmit={handleSubmit}>

                        <label>Email</label>

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter Email"
                            value={login.email}
                            onChange={handleChange}
                        />

                        <label className="mt-3">Password</label>

                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Enter Password"
                            value={login.password}
                            onChange={handleChange}
                        />
                        <Link
                            to="/forgot-password"
                            className="text-decoration-none"
                        >

                            Forgot Password?

                        </Link>

                        <button
                            className="btn btn-primary mt-4 w-100"
                            type="submit"
                        >
                            Login
                        </button>

                    </form>  </div>
            </div>

        </div>
    );
}