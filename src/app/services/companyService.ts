import { LoginHeader } from "@/common/authToken";
import { API } from "@/config/config";
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { HandleLogout } from "./userServices";


export const HandleUpdateCompany = async (companyId: number, reqData: any) => {
  return await axios({
    method: "PUT",
    url: `${API.company}/${companyId}`,
    headers: LoginHeader(),
    data: reqData,
  })
    .then((request) => {
      toast.success("Company updated");
      return request;
    })
    .catch((error) => {
      if (error) {
        HandleLogout();
        toast.error("company Update failed");
      }
      return error;
    });
};
