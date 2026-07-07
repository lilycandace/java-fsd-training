import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
});

http.interceptors.request.use((config) => {

    const auth = JSON.parse(localStorage.getItem("auth"));

    if (auth?.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;
});

export default http;


// import axios from "axios";

// const http = axios.create({

//     baseURL: "http://localhost:8080",

//     headers: {

//         "Content-Type": "application/json"

//     }

// });

// http.interceptors.response.use(

//     (response) => response,

//     (error) => {

//         if (error.response?.status === 401) {

//             localStorage.removeItem("auth");

//             window.location.href = "/login";

//         }

//         return Promise.reject(error);

//     }

// );

// export default http;