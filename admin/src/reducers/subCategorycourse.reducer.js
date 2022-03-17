/* eslint-disable no-param-reassign */
import { subcategoryCourseConstansts } from "../actions/constants";

const initState = {
  courseLinks: [],
  get_data: false,
  error: null,
};

export default (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case subcategoryCourseConstansts.GET_ALL_SUBCATEGORYCOURSELINKS_SUCCESS:
      state = {
        ...state,
        courseLinks: action.payload,
        get_data: true,
      };
      break;
    case subcategoryCourseConstansts.ADD_NEW_SUBCATEGORYCOURSELINK_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case subcategoryCourseConstansts.ADD_NEW_SUBCATEGORYCOURSELINK_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_data: false,
      };
      break;
    case subcategoryCourseConstansts.ADD_NEW_SUBCATEGORYCOURSELINK_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
