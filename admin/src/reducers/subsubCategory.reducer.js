/* eslint-disable no-param-reassign */
import { subSubcategoryConstansts } from "../actions/constants";

const initState = {
  subcategorylinks: [],
  get_data: false,
  error: null,
};

export default (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case subSubcategoryConstansts.GET_ALL_SUBSUBCATEGORYLINKS_SUCCESS:
      state = {
        ...state,
        subcategorylinks: action.payload,
        get_data: true,
      };
      break;
    case subSubcategoryConstansts.ADD_NEW_SUBSUBCATEGORYLINK_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case subSubcategoryConstansts.ADD_NEW_SUBSUBCATEGORYLINK_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_data: false,
      };
      break;
    case subSubcategoryConstansts.ADD_NEW_SUBSUBCATEGORYLINK_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
