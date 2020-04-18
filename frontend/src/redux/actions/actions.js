export const ADD_NOTE = "ADD_NOTE";
export const REMOVE_NOTE = "REMOVE_NOTE";
export const USER_SET_EMAIL = "USER_SET_EMAIL";
export const USER_SET_PASSWORD = "USER_SET_PASSWORD";
export const USER_SET_LOGGIN = "USER_SET_LOGGIN";

export const addNote = content => ({
  type: ADD_NOTE,
  content: content,
});

export const removeNote = id => ({
  type: REMOVE_NOTE,
  id: id,
});
export const setEmail = email => ({
  type: USER_SET_EMAIL,
  email: email,
});
export const setPassword = password => ({
  type: USER_SET_PASSWORD,
  password: password,
});
export const setIsLoggedIn = isLoggedIn => ({
         type: USER_SET_LOGGIN,
         isLoggedIn: isLoggedIn
       });
