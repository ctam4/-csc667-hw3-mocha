export const USER_SET_EMAIL = "USER_SET_EMAIL";
export const USER_SET_PASSWORD = "USER_SET_PASSWORD";
export const USER_SET_LOGIN = "USER_SET_LOGIN";

export const setEmail = email => ({
  type: USER_SET_EMAIL,
  email: email,
});

export const setPassword = password => ({
  type: USER_SET_PASSWORD,
  password: password,
});

export const setIsLoggedIn = isLoggedIn => ({
  type: USER_SET_LOGIN,
  isLoggedIn: isLoggedIn,
});
