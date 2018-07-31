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
    case types.GET_ALL_USER_REVIEWS.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        failure: false,
        errorMessage: false,
        value: action.payload,
      });
    case types.GET_ALL_USER_REVIEWS.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        failure: true,
        errorMessage: action.payload.response,
      });
    case types.GET_ALL_USER_REVIEWS.INIT:
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