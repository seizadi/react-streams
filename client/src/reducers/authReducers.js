const INITIAL_STATE = {
  signedIn: null
}

export default  (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'SIGN_IN':
      return { ...state, signedIn: true };
    case 'SIGN_OUT':
      return { ...state, signedIn: false };
    default:
      return state;
  }
}
