import http from "../common/http-common";

class UserService {

    getProfile() {

        return http.get("/api/users/profile");

    }

    updateProfile(id, user) {

        return http.put(`/api/users/updateUser/${id}`, user);

    }

}

export default new UserService();