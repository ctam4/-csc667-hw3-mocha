import {
  USER_SET_LOGIN,
  USER_SET_PASSWORD,
  USER_SET_EMAIL,
} from "../actions/actions";

const DEFAULT_STATE = {
  notes: [],
  email: "",
  password: "",
  isLoggedIn: false,
};

function rootReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case USER_SET_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    case USER_SET_PASSWORD:
      return {
        ...state,
        password: action.password,
      };
    case USER_SET_LOGIN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    default:
      return state;
  }
}

export default rootReducer;
