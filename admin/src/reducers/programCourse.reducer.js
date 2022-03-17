/* eslint-disable no-param-reassign */
import { programCourseConstansts } from "../actions/constants";

const initState = {
  programLinks: [],
  get_data: false,
  error: null,
};

export default (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case programCourseConstansts.GET_ALL_PROGRAMCOURSELINKS_SUCCESS:
      state = {
        ...state,
        programLinks: action.payload,
        get_data: true,
      };
      break;
    case programCourseConstansts.ADD_NEW_PROGRAMCOURSELINK_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case programCourseConstansts.ADD_NEW_PROGRAMCOURSELINK_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_data: false,
      };
      break;
    case programCourseConstansts.ADD_NEW_PROGRAMCOURSELINK_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
