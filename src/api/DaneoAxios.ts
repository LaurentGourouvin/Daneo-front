import axios, {type AxiosInstance} from "axios";

const baseURL = window.location.hostname === "localhost"
  ? import.meta.env.VITE_API_BASE_URL
  : `http://${window.location.hostname}:8080/api`

export const DaneoAxios: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers : {
    "Content-Type": "application/json"
  }
})

