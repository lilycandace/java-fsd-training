import http from "../common/http-common";

class AuthService {

    login(loginData) {
        return http.post("/auth/login", loginData);
    }

    register(registerData) {
        return http.post("/api/users/registerUser", registerData);
    }

    logout() {
        localStorage.removeItem("token");
    }
}

export default new AuthService();