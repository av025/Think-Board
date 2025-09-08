import axios from "axios"; 

const BASE_URL = import.meta.env.VITE_MODE === "development" ? import.meta.env.VITE_BASE_URL : "/api"
const API = axios.create({
    baseURL: BASE_URL
}); 

export default  API;