import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../urlConfig";
import store from "../store";
import { authConstants } from "../actions/constants";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const token = window.localStorage.getItem("token");

const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    // Crossorigin: true,
    // "Content-Type": "multipart/form-data",
  },
});

axiosIntance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

axiosIntance.interceptors.response.use(
  (res) => {
    // console.log(res);
    if (res.data.status === 200) {
      toast.success(res.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      // return res;
    } else {
      toast.error(res.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      // console.log(error.response.data.message);
      const status = res.status ? res.status : 500;
      if (status && status === 500) {
        localStorage.clear();
        store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
      }
      // return Promise.reject(error);
    }
    return res;
  },
  (error) => {
    toast.error(error.response.data.msg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
    // console.log(error.response.data.message);
    const status = error.response ? error.response.status : 500;
    if (status && status === 500) {
      localStorage.clear();
      store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
  }
);

export default axiosIntance;
