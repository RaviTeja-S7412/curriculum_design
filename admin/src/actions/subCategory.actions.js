/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
import { subcategoryConstansts } from "./constants";
import axios from "../helpers/axios";

export const get_subcategories = () => async (dispatch) => {
  const res = await axios.get(`/SubCategory/get_subcategories`);
  if (res.data.status === 200) {
    dispatch({
      type: subcategoryConstansts.GET_ALL_SUBCATEGORIES_SUCCESS,
      payload: res.data.all_subcategories,
    });
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: subcategoryConstansts.GET_ALL_SUBCATEGORIES_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const add_subcategory = (cat_data) => async (dispatch) => {
  dispatch({ type: subcategoryConstansts.ADD_NEW_SUBCATEGORY_REQUEST });
  const res = await axios.post(`/SubCategory/create`, cat_data);

  if (res.data.status === 200) {
    dispatch({
      type: subcategoryConstansts.ADD_NEW_SUBCATEGORY_SUCCESS,
      payload: { message: "Subject Category Added Successfully" },
    });
    dispatch(get_subcategories());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: subcategoryConstansts.ADD_NEW_SUBCATEGORY_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const update_subcategory = (cat_data) => async (dispatch) => {
  dispatch({ type: subcategoryConstansts.UPDATE_SUBCATEGORY_REQUEST });
  const res = await axios.post(`/SubCategory/create`, cat_data);

  if (res.data.status === 200) {
    dispatch({
      type: subcategoryConstansts.UPDATE_SUBCATEGORY_SUCCESS,
      payload: { message: "Subject Category Updated Successfully" },
    });
    dispatch(get_subcategories());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: subcategoryConstansts.UPDATE_SUBCATEGORY_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const delete_subcategory = (cat_data) => async (dispatch) => {
  dispatch({ type: subcategoryConstansts.DELETE_SUBCATEGORY_REQUEST });
  const res = await axios.post(`/SubCategory/delete`, cat_data);

  if (res.data.status === 200) {
    dispatch({
      type: subcategoryConstansts.DELETE_SUBCATEGORY_SUCCESS,
      payload: { message: "Subject Category Deleted Successfully" },
    });
    dispatch(get_subcategories());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: subcategoryConstansts.DELETE_SUBCATEGORY_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};
