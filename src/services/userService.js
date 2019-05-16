import http from "./httpService";
import { pointApi } from "../config.json";

const apiEndpoint = pointApi + "/profile/";

export function register(user) {
    return http.post(apiEndpoint, {
        email: user.email,
        password: user.password,
        name: user.name
    });
}