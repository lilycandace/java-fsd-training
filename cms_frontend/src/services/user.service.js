import axios from "axios";
import http from "../common/http-common";

class UserService {

    getProfile() {
        return http.get("/api/users/profile");
    }

    updateProfile(id, user) {
        return http.put(`/api/users/updateUser/${id}`, user);
    }

    getAllOfficers() {
        return http.get("/api/users/officers");
    }

    addOfficer(officer) {
        return http.post("/api/users/addOfficer", officer);
    }

    deleteOfficer(id) {
        return http.delete(`/api/users/deleteOfficer/${id}`);
    }
    getAllCitizens() {

        return http.get("/api/users/citizens");

    }
    forgotPassword(data) {
        return http.put("/api/users/forgot-password", data);
    }
    changePassword(data) {
        return http.put("/api/users/change-password", data);
    }

}

export default new UserService();