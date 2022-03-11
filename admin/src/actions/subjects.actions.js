/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
import { subjectConstansts } from "./constants";
import axios from "../helpers/axios";

export const get_subjects = () => async (dispatch) => {
  const res = await axios.get(`/Subject/get_subjects`);
  if (res.data.status === 200) {
    dispatch({
      type: subjectConstansts.GET_ALL_SUBJECTS_SUCCESS,
      payload: res.data.all_subjects,
    });
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: subjectConstansts.GET_ALL_SUBJECTS_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const add_subject = (cat_data) => async (dispatch) => {
  dispatch({ type: subjectConstansts.ADD_NEW_SUBJECT_REQUEST });
  const res = await axios.post(`/Subject/create`, cat_data);

  if (res.data.status === 200) {
    dispatch({
      type: subjectConstansts.ADD_NEW_SUBJECT_SUCCESS,
      payload: { message: res.data.msg },
    });
    dispatch(get_subjects());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: subjectConstansts.ADD_NEW_SUBJECT_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const update_subject = (cat_data) => async (dispatch) => {
  dispatch({ type: subjectConstansts.UPDATE_SUBJECT_REQUEST });
  const res = await axios.post(`/Subject/create`, cat_data);

  if (res.data.status === 200) {
    dispatch({
      type: subjectConstansts.UPDATE_SUBJECT_SUCCESS,
      payload: { message: res.data.msg },
    });
    dispatch(get_subjects());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: subjectConstansts.UPDATE_SUBJECT_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const delete_subject = (cat_data) => async (dispatch) => {
  dispatch({ type: subjectConstansts.DELETE_SUBJECT_REQUEST });
  const res = await axios.post(`/Subject/delete`, cat_data);

  if (res.data.status === 200) {
    dispatch({
      type: subjectConstansts.DELETE_SUBJECT_SUCCESS,
      payload: { message: res.data.msg },
    });
    dispatch(get_subjects());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: subjectConstansts.DELETE_SUBJECT_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};
