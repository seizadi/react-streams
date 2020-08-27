import _ from 'lodash';
import { CREATE_STREAM, LIST_STREAMS, GET_STREAM, DELETE_STREAM, UPDATE_STREAM } from "../actions/types";

const INITIAL_STATE = {}

export default  (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case GET_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case UPDATE_STREAM:
      // const newState = { ...state };
      // newstate[action.payload.id] = action.payload;
      // return newState;
      return { ...state, [action.payload.id]: action.payload };
    case LIST_STREAMS:
      // let newState = {};
      // action.payload.forEach((stream) => {
      //   newState = { ...newState, [stream.id]: stream }
      // });
      // return newState;
      return _.mapKeys( action.payload, 'id');
    case DELETE_STREAM:
      // newState = {...state, [action.payload]: undefined };
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
