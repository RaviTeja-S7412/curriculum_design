/* eslint-disable no-param-reassign */
import { programConstansts } from "../actions/constants";

const initState = {
  programs: [],
  get_data: false,
  error: null,
};

export default (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case programConstansts.GET_ALL_PROGRAMS_SUCCESS:
      state = {
        ...state,
        programs: action.payload,
        get_data: true,
      };
      break;
    case programConstansts.ADD_NEW_PROGRAM_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case programConstansts.ADD_NEW_PROGRAM_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_data: false,
      };
      break;
    case programConstansts.ADD_NEW_PROGRAM_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
    case programConstansts.UPDATE_PROGRAM_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case programConstansts.UPDATE_PROGRAM_SUCCESS:
      state = {
        ...state,
        programs: action.payload.programs,
        loading: false,
        get_data: false,
      };
      break;
    case programConstansts.UPDATE_PROGRAM_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case programConstansts.DELETE_PROGRAM_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case programConstansts.DELETE_PROGRAM_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_data: false,
      };
      break;
    case programConstansts.DELETE_PROGRAM_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
