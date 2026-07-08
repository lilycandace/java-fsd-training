import http from "../common/http-common";

class AssignmentService {

    getAssignmentsByOfficer(id) {

        return http.get(`/api/assignments/getAssignments/${id}`);

    }
    assignOfficer(data) {

        return http.post("/api/assignments/assignOfficer", data);

    }
    getAssignmentByIncident(id) {

        return http.get(`/api/assignments/incident/${id}`);

    }
    getClosedAssignments() {

        return http.get("/api/assignments/closedAssignments");

    }
    getOfficerWorkloads() {

    return http.get("/api/assignments/workloads");

}
}

export default new AssignmentService();