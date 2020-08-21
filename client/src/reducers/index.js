import { combineReducers } from "redux";

const signInOrOutReducer = (state = null, action) => {
  switch(action.type) {
    case 'SIGN_IN':
      return true;
    case 'SIGN_OUT':
      return false;
    default:
      return state;
  }
}

export default combineReducers( { signedIn: signInOrOutReducer });
