import axios, {type AxiosInstance} from "axios";

export const daneoAxios = () => {
  const api : AxiosInstance = axios.create({
    baseURL : "http://localhost:8080/api"
  })
}
