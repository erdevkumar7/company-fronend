import { LoginHeader, authHeader } from "@/common/authToken";
import { API } from "@/config/config";
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export const BASE_URL = "http://localhost:8080";

export const HandleGetStudents = async () => {
    const API_URL = `${API.student}`
    return await axios({
        method: "GET",
        url: API_URL,
        headers: authHeader(),
    })
        .then((request) => {
            return request;
        })
        .catch((error) => {
            if (error?.response?.status === 401) {
            } else {
                toast.error("Something went wrong");
            }
            return error;
        });
}