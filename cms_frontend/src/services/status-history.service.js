import http from "../common/http-common";

class StatusHistoryService {

    updateStatus(data) {

        return http.put(
            "/api/statusHistory/updateStatus",
            data
        );

    }

}

export default new StatusHistoryService();