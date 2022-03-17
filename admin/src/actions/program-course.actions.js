/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
import { programCourseConstansts } from "./constants";
import axios from "../helpers/axios";

export const get_programLinks = () => async (dispatch) => {
  const res = await axios.get(`/Links/get_programLinks`);
  if (res.data.status === 200) {
    dispatch({
      type: programCourseConstansts.GET_ALL_PROGRAMCOURSELINKS_SUCCESS,
      payload: res.data.all_programLinks,
    });
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: programCourseConstansts.GET_ALL_PROGRAMCOURSELINKS_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const add_programLinks = (cat_data) => async (dispatch) => {
  dispatch({ type: programCourseConstansts.ADD_NEW_PROGRAMCOURSELINK_REQUEST });
  const res = await axios.post(`/Links/course_program_link`, cat_data);
  if (res.data.status === 200) {
    dispatch({
      type: programCourseConstansts.ADD_NEW_PROGRAMCOURSELINK_SUCCESS,
      payload: { message: res.data.msg },
    });
    dispatch(get_programLinks());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: programCourseConstansts.ADD_NEW_PROGRAMCOURSELINK_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};
