import { authConstants } from "../actions/constants";

const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
  get_dept: false,
};

export default (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      // eslint-disable-next-line no-param-reassign
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      // eslint-disable-next-line no-param-reassign
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstants.LOGOUT_REQUEST:
      // eslint-disable-next-line no-param-reassign
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGOUT_SUCCESS:
      // eslint-disable-next-line no-param-reassign
      state = {
        ...initState,
      };
      break;
    case authConstants.LOGOUT_FAILURE:
      // eslint-disable-next-line no-param-reassign
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      // eslint-disable-next-line no-param-reassign
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case authConstants.GET_DEPARTMENTS:
      // eslint-disable-next-line no-param-reassign
      state = {
        ...state,
        departments: action.payload.departments,
        get_dept: true,
        loading: false,
      };
      break;
  }

  return state;
};
