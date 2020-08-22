import { SIGN_IN, SIGN_OUT } from "./types";

export const signIn = (userId, name, email, jwt) => {
  return ({
    type: SIGN_IN,
    payload: {
      userId: userId,
      name: name,
      email: email,
      jwt: jwt
    }
  });
};

export const signOut = () => {
  return ({
    type: SIGN_OUT,
    payload: {
      userId: null,
      name: '',
      email: '',
      jwt: ''
    }
  });
}
