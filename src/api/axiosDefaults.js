import axios from "axios";

axios.defaults.baseURL = "https://moments-db-b9026c5319dc.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = false;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
