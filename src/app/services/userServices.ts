import { LoginHeader } from "@/common/authToken";
import { API } from "@/config/config";
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";


export const HandleRegister = async (reqData: any) => {
  return await axios({
    method: "POST",
    url: `${API.user}`,
    data: reqData,
  }).then((request) => {
    console.log('request',request)
    if (request.data) {
      toast.success("Registration Successfully")
    }
    return request;
  }).catch((error) => {
    if (error.response.status === 400) {
      toast.error("Email already exists")
    } else if (error.response.status === 401) {
      console.log('LOGOUT USER')
      HandleLogout()
    } else {
      toast.error("User added failed")
    }
    return error;
  })
}


export const HandleLogin = async (reqData: any) => {
  return await axios({
    method: "POST",
    url: `${API.login}`,
    data: reqData,
  }).then((request) => {
    toast.success("Login Successfull");
    return request;
  }).catch((error) => {
    if (error.response.status === 400) {
      toast.error(`Incorrect Password!`)
    } else if (error.response.status === 404) {
      toast.error(`User not found with this Email!`)
    } else if (error.response.status === 401) {
      HandleLogout()
    } else {
      toast.error("User added failed")
    }
    return error;
  })

}

export const HandleProfile = async (userId: any) => {
  return await axios({
    method: "GET",
    url: `${API.user}/${userId}`,
    headers: LoginHeader(),
  })
    .then((request) => {
      return request;
    })
    .catch((error) => {
      toast.error("Something went wrong");
        HandleLogout();
      return error;
    });
};

export const HandleUpdateProfile = async (userId: number, reqData: any) => {
  return await axios({
    method: "PUT",
    url: `${API.user}/${userId}`,
    headers: LoginHeader(),
    data: reqData,
  })
    .then((request) => {
      toast.success("Profile updated");
      return request;
    })
    .catch((error) => {
      if (error.response.status === 400) {
        toast.error("Email already exists");
      } else if (error.response.status === 401) {
        HandleLogout();
      } else {
        toast.error("User added failed");
      }
      return error;
    });
};


export const HandleLogout = () => {
  localStorage.clear()
  window.location.replace("/login");

};