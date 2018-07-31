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
    case types.GET_ALL_BOOKINGS.SUCCESS:
      return Object.assign({}, state, {
        isFetched: true,
        isFetching: false,
        failure: false,
        errorMessage: false,
        value: action.payload,
      });
    case types.GET_ALL_BOOKINGS.FAILURE:
      return Object.assign({}, state, {
        isFetched: false,
        isFetching: false,
        failure: true,
        errorMessage: action.payload.response,
      });
    case types.GET_ALL_BOOKINGS.INIT:
      return Object.assign({}, state, {
        isFetched: false,
        isFetching: false,
        errorMessage: false,
        value: []
      });
    default:
      return state;
  }
}