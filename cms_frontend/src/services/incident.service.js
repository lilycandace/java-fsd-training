import http from "../common/http-common";

class IncidentService {

    createIncident(data) {
        return http.post("/api/incidents/createIncident", data);
    }

    getMyIncidents() {
        return http.get("/api/incidents/myIncidents");
    }

    getIncident(id) {
        return http.get(`/api/incidents/getIncident/${id}`);
    }

    downloadIncidentReport(id) {
        return http.get(
            `/api/incidents/downloadReport/${id}`,
            {
                responseType: "blob"
            }
        );
    }
    updateStatus(data) {

    return http.put("/api/statusHistory/updateStatus", data);

}
getAllIncidents(){

return http.get("/api/incidents/getAllIncidents");

}
getClosedIncidents() {

    return http.get("/api/incidents/closedIncidents");

}
}

export default new IncidentService();