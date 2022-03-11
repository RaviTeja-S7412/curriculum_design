/* eslint-disable no-param-reassign */
import { subcategoryConstansts } from "../actions/constants";

const initState = {
  subcategories: [],
  get_data: false,
  error: null,
};

export default (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case subcategoryConstansts.GET_ALL_SUBCATEGORIES_SUCCESS:
      state = {
        ...state,
        subcategories: action.payload,
        get_data: true,
      };
      break;
    case subcategoryConstansts.ADD_NEW_SUBCATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case subcategoryConstansts.ADD_NEW_SUBCATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_data: false,
      };
      break;
    case subcategoryConstansts.ADD_NEW_SUBCATEGORY_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
    case subcategoryConstansts.UPDATE_SUBCATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case subcategoryConstansts.UPDATE_SUBCATEGORY_SUCCESS:
      state = {
        ...state,
        subcategories: action.payload.subcategories,
        loading: false,
        get_data: false,
      };
      break;
    case subcategoryConstansts.UPDATE_SUBCATEGORY_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case subcategoryConstansts.DELETE_SUBCATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case subcategoryConstansts.DELETE_SUBCATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_data: false,
      };
      break;
    case subcategoryConstansts.DELETE_SUBCATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
