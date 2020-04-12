export const ADD_NOTE = "ADD_NOTE";
export const REMOVE_NOTE = "REMOVE_NOTE";

export const addNote = content => {
  return {
    type: ADD_NOTE,
    content: content,
  };
};

export const removeNote = id => {
  return {
    type: REMOVE_NOTE,
    id: id,
  };
};
