import axios from "axios";

const API_INSTANCE = axios.create({
    baseURL: "http://10.28.87.26:8000/api"
});

export default API_INSTANCE;