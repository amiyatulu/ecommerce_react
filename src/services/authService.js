import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from 'jwt-decode';

const apiEndpoint = apiUrl + "/api-token-auth/";
const tokenKey = "token";
// http.setJwt(getJwt());

export async function login(email, password) {
    const {data: jwt} = await http.post(apiEndpoint, {email, password});
    localStorage.setItem(tokenKey, jwt["token"]);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
        
      } catch (ex) {
          return null;
      }
      
}
export function getJwt() {
    try{
    const jwt = localStorage.getItem(tokenKey);
    return jwt;
    } catch (ex) {
        return null;
    }
  }

export default {
    login,
    logout,
    getCurrentUser,
    getJwt
}