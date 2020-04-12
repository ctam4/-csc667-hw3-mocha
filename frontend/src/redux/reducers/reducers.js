import { ADD_NOTE, REMOVE_NOTE } from "../actions/actions";

const DEFAULT_STATE = {
  notes: []
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
    default:
      return state;
  }
}

export default rootReducer;
