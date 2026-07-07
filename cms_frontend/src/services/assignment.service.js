import http from "../common/http-common";

class AssignmentService {

    getAssignmentsByOfficer(id) {

        return http.get(`/api/assignments/getAssignments/${id}`);

    }
    assignOfficer(data) {

        return http.post("/api/assignments/assignOfficer", data);

    }

}

export default new AssignmentService();