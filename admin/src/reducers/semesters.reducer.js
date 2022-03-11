/* eslint-disable no-param-reassign */
import { semesterConstansts } from "../actions/constants";

const initState = {
  semesters: [],
  get_data: false,
  error: null,
};

export default (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case semesterConstansts.GET_ALL_SEMESTERS_SUCCESS:
      state = {
        ...state,
        semesters: action.payload,
        get_data: true,
      };
      break;
    case semesterConstansts.ADD_NEW_SEMESTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case semesterConstansts.ADD_NEW_SEMESTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_data: false,
      };
      break;
    case semesterConstansts.ADD_NEW_SEMESTER_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
    case semesterConstansts.UPDATE_SEMESTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case semesterConstansts.UPDATE_SEMESTER_SUCCESS:
      state = {
        ...state,
        semesters: action.payload.semesters,
        loading: false,
        get_data: false,
      };
      break;
    case semesterConstansts.UPDATE_SEMESTER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case semesterConstansts.DELETE_SEMESTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case semesterConstansts.DELETE_SEMESTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_data: false,
      };
      break;
    case semesterConstansts.DELETE_SEMESTER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
