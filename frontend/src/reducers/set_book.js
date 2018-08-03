import * as types from '../actions/actionTypes';

const initialState = {
  init: true,
  isFetched: false,
  errorMessage: false,
  isFailure: false,
  value: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case types.SET_BOOKING.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        failure: false,
        errorMessage: false,
        value: action.payload,
      });
    case types.SET_BOOKING.FAILURE:
      console.log('=== SET_BOOKING Failed: ', action)
      return Object.assign({}, state, {
        init: false,
        isFetching: false,
        isFetched: true,
        failure: true,
        errorMessage: action.payload.statusText,
      });
    case types.SET_BOOKING.INIT:
      return Object.assign({}, state, {
        init: false,
        isFetched: false,
        isFetching: false,
        errorMessage: false,
        value: []
      });
    default:
      return state;
  }
}