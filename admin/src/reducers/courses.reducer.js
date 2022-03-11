/* eslint-disable no-param-reassign */
import { courseConstansts } from "../actions/constants";

const initState = {
  courses: [],
  get_data: false,
  error: null,
};

export default (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case courseConstansts.GET_ALL_COURSES_SUCCESS:
      state = {
        ...state,
        courses: action.payload,
        get_data: true,
      };
      break;
    case courseConstansts.ADD_NEW_COURSE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case courseConstansts.ADD_NEW_COURSE_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_data: false,
      };
      break;
    case courseConstansts.ADD_NEW_COURSE_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
    case courseConstansts.UPDATE_COURSE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case courseConstansts.UPDATE_COURSE_SUCCESS:
      state = {
        ...state,
        courses: action.payload.courses,
        loading: false,
        get_data: false,
      };
      break;
    case courseConstansts.UPDATE_COURSE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case courseConstansts.DELETE_COURSE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case courseConstansts.DELETE_COURSE_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_data: false,
      };
      break;
    case courseConstansts.DELETE_COURSE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
