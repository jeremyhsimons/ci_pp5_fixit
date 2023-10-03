import axios from "axios";

axios.defaults.baseURL = "https://fixit-drf-api-b3b58b2bc39c.herokuapp.com/"
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

export const axiosReq = axios.create();
export const axiosRes = axios.create();
