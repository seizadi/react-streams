import streams from "../api/streams";
import { SIGN_IN, SIGN_OUT, CREATE_STREAM,
  LIST_STREAMS, GET_STREAM, DELETE_STREAM, UPDATE_STREAM } from "./types";
import history from '../history';

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


export const createStream = (formValues) => async ( dispatch, getState ) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });
  dispatch({type: CREATE_STREAM, payload: response.data });
  history.push('/');
}

export const listStreams = () => async dispatch => {
  const response = await streams.get('/streams');
  dispatch({type: LIST_STREAMS, payload: response.data});
}
export const getStream = (id) => async dispatch => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({type: GET_STREAM, payload: response.data });
}
export const deleteStream = (id) => async dispatch => {
  const response = await streams.delete(`/streams/${id}`);
  dispatch({type: DELETE_STREAM, payload: response.data});
  history.push('/');
}
export const updateStream = (id, formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;

  const response = await streams.put(`/streams/${id}`, { ...formValues, userId });
  dispatch({ type: UPDATE_STREAM, payload: response.data});
  history.push('/');
}
