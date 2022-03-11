/* eslint-disable no-param-reassign */
import { subjectConstansts } from "../actions/constants";

const initState = {
  subjects: [],
  get_data: false,
  error: null,
};

export default (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case subjectConstansts.GET_ALL_SUBJECTS_SUCCESS:
      state = {
        ...state,
        subjects: action.payload,
        get_data: true,
      };
      break;
    case subjectConstansts.ADD_NEW_SUBJECT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case subjectConstansts.ADD_NEW_SUBJECT_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_data: false,
      };
      break;
    case subjectConstansts.ADD_NEW_SUBJECT_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
    case subjectConstansts.UPDATE_SUBJECT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case subjectConstansts.UPDATE_SUBJECT_SUCCESS:
      state = {
        ...state,
        subjects: action.payload.subjects,
        loading: false,
        get_data: false,
      };
      break;
    case subjectConstansts.UPDATE_SUBJECT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case subjectConstansts.DELETE_SUBJECT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case subjectConstansts.DELETE_SUBJECT_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_data: false,
      };
      break;
    case subjectConstansts.DELETE_SUBJECT_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
