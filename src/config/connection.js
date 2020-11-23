import axios from "axios";

const API_INSTANCE = axios.create({
    baseURL: "http://127.0.0.1:8000/api"
});

export default API_INSTANCE;