import axios from "axios";

const API_INSTANCE = axios.create({
    baseURL: "http://10.28.87.112:8001/api"
});

export default API_INSTANCE;