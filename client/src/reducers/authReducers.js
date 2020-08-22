import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  signedIn: null,
  userId: null,
  name: '',
  email: '',
  jwt: ''
}

export default  (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SIGN_IN:
      return { ...state, ...action.payload, signedIn: true };
    case SIGN_OUT:
      return { ...state, ...action.payload, signedIn: false };
    default:
      return state;
  }
}
