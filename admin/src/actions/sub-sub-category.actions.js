/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
import { subSubcategoryConstansts } from "./constants";
import axios from "../helpers/axios";

export const get_subcategoryLinks = () => async (dispatch) => {
  const res = await axios.get(`/Links/get_subcategoryLinks`);
  if (res.data.status === 200) {
    dispatch({
      type: subSubcategoryConstansts.GET_ALL_SUBSUBCATEGORYLINKS_SUCCESS,
      payload: res.data.all_subcategoryLinks,
    });
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: subSubcategoryConstansts.GET_ALL_SUBSUBCATEGORYLINKS_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};

export const add_subcategoryLinks = (cat_data) => async (dispatch) => {
  dispatch({ type: subSubcategoryConstansts.ADD_NEW_SUBSUBCATEGORYLINK_REQUEST });
  const res = await axios.post(`/Links/sub_subcategory_link`, cat_data);

  if (res.data.status === 200) {
    dispatch({
      type: subSubcategoryConstansts.ADD_NEW_SUBSUBCATEGORYLINK_SUCCESS,
      payload: { message: res.data.msg },
    });
    dispatch(get_subcategoryLinks());
  } else {
    if (res.data.status === 400) {
      dispatch({
        type: subSubcategoryConstansts.ADD_NEW_SUBSUBCATEGORYLINK_FAILURE,
        payload: { error: res.data.msg },
      });
    }
  }
};
