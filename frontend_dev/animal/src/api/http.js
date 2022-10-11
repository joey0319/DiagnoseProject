import Axios from "axios";
import { getAccessToken } from "../function/functions";

const axios = Axios.create();

const baseURL = process.env.REACT_APP_API_URL;

// 기본 api
export const http = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
    "Content-Type": "application/json",
  },
});
