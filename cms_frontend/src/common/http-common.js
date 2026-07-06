import axios from "axios";

const http = axios.create({

    baseURL: "http://localhost:8080",

    headers: {

        "Content-Type": "application/json"

    }

});

http.interceptors.request.use((config) => {

    const auth = JSON.parse(localStorage.getItem("auth"));

    if (auth) {

        config.headers.Authorization = `Bearer ${auth.token}`;

    }

    return config;

});

export default http;