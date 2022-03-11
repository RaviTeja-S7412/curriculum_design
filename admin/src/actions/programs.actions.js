/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
import { programConstansts } from "./constants";
import axios from "../helpers/axios";

export const get_programs = () => async (dispatch) => {
  const res = await axios.get(`/Program/get_programs`);
  if (res.data.status === 200) {
    dispatch({
      type: programConstansts.GET_ALL_PROGRAMS_SUCCESS,
      payload: res.data.all_programs,
    });
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: programConstansts.GET_ALL_PROGRAMS_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const add_program = (cat_data) => async (dispatch) => {
  dispatch({ type: programConstansts.ADD_NEW_PROGRAM_REQUEST });
  const res = await axios.post(`/Program/create`, cat_data);

  if (res.data.status === 200) {
    dispatch({
      type: programConstansts.ADD_NEW_PROGRAM_SUCCESS,
      payload: { message: "Program Added Successfully" },
    });
    dispatch(get_programs());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: programConstansts.ADD_NEW_PROGRAM_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const update_program = (cat_data) => async (dispatch) => {
  dispatch({ type: programConstansts.UPDATE_PROGRAM_REQUEST });
  const res = await axios.post(`/Program/create`, cat_data);

  if (res.data.status === 200) {
    dispatch({
      type: programConstansts.UPDATE_PROGRAM_SUCCESS,
      payload: { message: "Program Updated Successfully" },
    });
    dispatch(get_programs());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: programConstansts.UPDATE_PROGRAM_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const delete_program = (cat_data) => async (dispatch) => {
  dispatch({ type: programConstansts.DELETE_PROGRAM_REQUEST });
  const res = await axios.post(`/Program/delete`, cat_data);

  if (res.data.status === 200) {
    dispatch({
      type: programConstansts.DELETE_PROGRAM_SUCCESS,
      payload: { message: "Program Deleted Successfully" },
    });
    dispatch(get_programs());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: programConstansts.DELETE_PROGRAM_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};
