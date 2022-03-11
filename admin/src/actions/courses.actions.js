/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
import { courseConstansts } from "./constants";
import axios from "../helpers/axios";

export const get_courses = () => async (dispatch) => {
  const res = await axios.get(`/Courses/get_courses`);
  if (res.data.status === 200) {
    dispatch({
      type: courseConstansts.GET_ALL_COURSES_SUCCESS,
      payload: res.data.all_courses,
    });
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: courseConstansts.GET_ALL_COURSES_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const add_course = (cat_data) => async (dispatch) => {
  dispatch({ type: courseConstansts.ADD_NEW_COURSE_REQUEST });
  const res = await axios.post(`/Courses/create`, cat_data);

  if (res.data.status === 200) {
    dispatch({
      type: courseConstansts.ADD_NEW_COURSE_SUCCESS,
      payload: { message: "Course Added Successfully" },
    });
    dispatch(get_courses());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: courseConstansts.ADD_NEW_COURSE_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const update_course = (cat_data) => async (dispatch) => {
  dispatch({ type: courseConstansts.UPDATE_COURSE_REQUEST });
  const res = await axios.post(`/Courses/create`, cat_data);

  if (res.data.status === 200) {
    dispatch({
      type: courseConstansts.UPDATE_COURSE_SUCCESS,
      payload: { message: "Course Updated Successfully" },
    });
    dispatch(get_courses());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: courseConstansts.UPDATE_COURSE_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const delete_course = (cat_data) => async (dispatch) => {
  dispatch({ type: courseConstansts.DELETE_COURSE_REQUEST });
  const res = await axios.post(`/Courses/delete`, cat_data);

  if (res.data.status === 200) {
    dispatch({
      type: courseConstansts.DELETE_COURSE_SUCCESS,
      payload: { message: "Course Deleted Successfully" },
    });
    dispatch(get_courses());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: courseConstansts.DELETE_COURSE_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};
