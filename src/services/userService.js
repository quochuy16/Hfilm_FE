import {
     API_URL_GET_USER,
     API_URL_UPDATE_USER,
     API_URL_LOGIN,
     API_URL_REGISTER
} from "../constants/configURL";
import axiosClient from "./http-common";
   
    export const getUser = (id) => {
     return axiosClient.get(API_URL_GET_USER + "/" + id);
    }
    export const updateUser = (id,values) => {
      return axiosClient.put(API_URL_UPDATE_USER + "/" + id,values);
    }
    export const login = (values) => {
      return axiosClient.post(API_URL_LOGIN,values);
    }
    export const register = (values) => {
      return axiosClient.post(API_URL_REGISTER,values);
    }