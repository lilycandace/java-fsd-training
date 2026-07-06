import { useState } from "react";
import AuthService from "../services/auth.service";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { loginSuccess } from "../redux/slices/authSlice";
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
        <div className="container mt-5">

            <form onSubmit={handleSubmit}>

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

                <button
                    className="btn btn-primary mt-4 w-100"
                    type="submit"
                >
                    Login
                </button>

            </form>

        </div>
    );
}