import {
  ADD_NOTE,
  REMOVE_NOTE,
  USER_SET_LOGGIN,
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
    case ADD_NOTE:
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            content: action.content,
          }
        ]
      };
    case REMOVE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note, index) => index !== action.id),
      };
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
      case USER_SET_LOGGIN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    default:
      return state;
  }
}

export default rootReducer;
