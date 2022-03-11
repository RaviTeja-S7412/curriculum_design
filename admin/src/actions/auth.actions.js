import { authConstants } from "./constants";
import axios from "../helpers/axios";
// eslint-disable-next-line camelcase
import { get_userdata } from "../helpers/Admin";

export const login = (user) => async (dispatch) => {
  dispatch({ type: authConstants.LOGIN_REQUEST });
  const res = await axios.post(`/Login/do_login`, {
    ...user,
  });

  if (res.data.status === 200) {
    // eslint-disable-next-line no-shadow
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({
      type: authConstants.LOGIN_SUCCESS,
      payload: {
        token,
        user,
      },
    });
    dispatch(get_userdata());
  } else {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      payload: { error: res.data.msg },
    });
  }
};

export const updateProfile = (user) => async (dispatch) => {
  dispatch({ type: authConstants.UPDATE_PROFILE });
  const res = await axios.post(`/admin/updateProfile`, user);

  if (res.status === 200) {
    localStorage.setItem("user", JSON.stringify(res.data.user));
    dispatch({
      type: authConstants.UPDATE_PROFILE,
      payload: {
        message: "Updated Successfully",
      },
    });
    dispatch(get_userdata());
  } else if (res.status === 400) {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      payload: { error: res.data.error },
    });
  }
};

export const updatePassword = (user) => async (dispatch) => {
  // dispatch({ type: authConstants.UPDATE_PASSWORD });
  const res = await axios.post(`/admin/updatePassword`, user);

  if (res.status === 200) {
    dispatch({
      type: authConstants.UPDATE_PASSWORD,
      payload: {
        message: "Password Updated Successfully",
      },
    });
    dispatch(get_userdata());
  } else if (res.status === 400) {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      payload: { error: res.data.error },
    });
  }
};

export const isUserLoggedIn = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch({
      type: authConstants.LOGIN_SUCCESS,
      payload: {
        token,
        user,
      },
    });
  } else {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      payload: { error: "Failed to login" },
    });
  }
};

export const signout = () => async (dispatch) => {
  dispatch({ type: authConstants.LOGOUT_REQUEST });
  const res = await axios.post(`/Login/signout`);

  if (res.data.status === 200) {
    localStorage.clear();
    dispatch({ type: authConstants.LOGOUT_SUCCESS });
  } else {
    dispatch({
      type: authConstants.LOGOUT_FAILURE,
      payload: { error: res.data.msg },
    });
  }
};
