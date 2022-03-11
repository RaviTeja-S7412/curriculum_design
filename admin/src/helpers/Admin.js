/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { authConstants } from "../actions/constants";
import axios from "./axios";

// eslint-disable-next-line consistent-return
export const get_userdata = () => async (dispatch) => {
  const udata = JSON.parse(localStorage.getItem("user"));
  // dispatch({ type: authConstants.GET_USERDATA });
  // eslint-disable-next-line no-underscore-dangle
  const res = await axios.post(`/Login/get_userdata`, { user_id: udata.Sno });

  if (res.data.status === 200) {
    return dispatch({
      type: authConstants.GET_USERDATA,
      payload: { ...res.data.user },
    });
  }
  if (res.data.status === 400) {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      payload: { error: res.data.msg },
    });
  }
};

// eslint-disable-next-line consistent-return
export const get_departments = () => async (dispatch) => {
  const res = await axios.get(`/admin/get_departments`);

  if (res.status === 200) {
    return dispatch({
      type: authConstants.GET_DEPARTMENTS,
      payload: { departments: res.data.departments },
    });
  }
  if (res.status === 400) {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      payload: { error: res.data.error },
    });
  }
};

export const get_hsncodes = () => async (dispatch) => {
  const res = await axios.get(`/admin/get_hsn_codes`);

  if (res.status === 200) {
    return dispatch({
      type: authConstants.GET_ALL_HSNCODES_SUCCESS,
      payload: res.data.all_hsn_codes,
    });
  }
  if (res.status === 400) {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      payload: { error: res.data.error },
    });
  }
};

export const get_cities = () => async (dispatch) => {
  const res = await axios.get(`/admin/get_cities`);

  if (res.status === 200) {
    return dispatch({
      type: authConstants.GET_ALL_CITIES,
      payload: res.data.cities,
    });
  }
  if (res.status === 400) {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      payload: { error: res.data.error },
    });
  }
};

export const get_attributesbyname = () => async (dispatch) => {
  const res = await axios.post(`/admin/get_attributesbyname`);

  dispatch({ type: authConstants.GET_ALL_ATTRIBUTESBYNAME_REQUEST });
  if (res.status === 200) {
    return dispatch({
      type: authConstants.GET_ALL_ATTRIBUTESBYNAME,
      payload: res.data.attributes,
    });
  }
  if (res.status === 400) {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      payload: { error: res.data.error },
    });
  }
};
