/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
import { semesterConstansts } from "./constants";
import axios from "../helpers/axios";

export const get_semesters = () => async (dispatch) => {
  const res = await axios.get(`/Semester/get_semesters`);
  if (res.data.status === 200) {
    dispatch({
      type: semesterConstansts.GET_ALL_SEMESTERS_SUCCESS,
      payload: res.data.all_semesters,
    });
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: semesterConstansts.GET_ALL_SEMESTERS_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const add_semester = (cat_data) => async (dispatch) => {
  dispatch({ type: semesterConstansts.ADD_NEW_SEMESTER_REQUEST });
  const res = await axios.post(`/Semester/create`, cat_data);

  if (res.data.status === 200) {
    dispatch({
      type: semesterConstansts.ADD_NEW_SEMESTER_SUCCESS,
      payload: { message: res.data.msg },
    });
    dispatch(get_semesters());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: semesterConstansts.ADD_NEW_SEMESTER_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const update_semester = (cat_data) => async (dispatch) => {
  dispatch({ type: semesterConstansts.UPDATE_SEMESTER_REQUEST });
  const res = await axios.post(`/Semester/create`, cat_data);

  if (res.data.status === 200) {
    dispatch({
      type: semesterConstansts.UPDATE_SEMESTER_SUCCESS,
      payload: { message: res.data.msg },
    });
    dispatch(get_semesters());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: semesterConstansts.UPDATE_SEMESTER_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const delete_semester = (cat_data) => async (dispatch) => {
  dispatch({ type: semesterConstansts.DELETE_SEMESTER_REQUEST });
  const res = await axios.post(`/Semester/delete`, cat_data);

  if (res.data.status === 200) {
    dispatch({
      type: semesterConstansts.DELETE_SEMESTER_SUCCESS,
      payload: { message: res.data.msg },
    });
    dispatch(get_semesters());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: semesterConstansts.DELETE_SEMESTER_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};
