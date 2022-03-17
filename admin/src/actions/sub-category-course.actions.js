/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
import { subcategoryCourseConstansts } from "./constants";
import axios from "../helpers/axios";

export const get_courseLinks = () => async (dispatch) => {
  const res = await axios.get(`/Links/get_courseLinks`);
  if (res.data.status === 200) {
    dispatch({
      type: subcategoryCourseConstansts.GET_ALL_SUBCATEGORYCOURSELINKS_SUCCESS,
      payload: res.data.all_courseLinks,
    });
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: subcategoryCourseConstansts.GET_ALL_SUBCATEGORYCOURSELINKS_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const add_courseLinks = (cat_data) => async (dispatch) => {
  dispatch({ type: subcategoryCourseConstansts.ADD_NEW_SUBCATEGORYCOURSELINK_REQUEST });
  const res = await axios.post(`/Links/subcategory_course_link`, cat_data);

  if (res.data.status === 200) {
    dispatch({
      type: subcategoryCourseConstansts.ADD_NEW_SUBCATEGORYCOURSELINK_SUCCESS,
      payload: { message: res.data.msg },
    });
    dispatch(get_courseLinks());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: subcategoryCourseConstansts.ADD_NEW_SUBCATEGORYCOURSELINK_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};
