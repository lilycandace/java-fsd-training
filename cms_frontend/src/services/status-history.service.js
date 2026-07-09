import http from "../common/http-common";

class StatusHistoryService {

    updateStatus(data) {

        return http.put(
            "/api/statusHistory/updateStatus",
            data
        );

    }
    getHistory(incidentId) {

    return http.get(

        `/api/statusHistory/getHistory/${incidentId}`

    );

}

}

export default new StatusHistoryService();