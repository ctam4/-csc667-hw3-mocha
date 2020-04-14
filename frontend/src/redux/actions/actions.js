export const ADD_NOTE = "ADD_NOTE";
export const REMOVE_NOTE = "REMOVE_NOTE";

export const addNote = content => ({
  type: ADD_NOTE,
  content: content,
});

export const removeNote = id => ({
  type: REMOVE_NOTE,
  id: id,
});

export const addNoteFromForm = (content) => (dispatch, getState) => {
  dispatch(addNote(content)); //debug
  // TODO: API call
};
