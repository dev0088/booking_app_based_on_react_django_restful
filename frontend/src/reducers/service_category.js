import * as types from '../actions/actionTypes';

const initialState = {
  init: true,
  isFetched: false,
  errorMessage: false,
  isFailure: false,
  value: []
};

export default (state = initialState, action) => {
  // console.log("==shipTalent==", state, action);
  switch(action.type) {
    case types.GET_ALL_SERVICE_CATEGORIES.SUCCESS:
      return Object.assign({}, state, {
        init: false,
        isFetched: true,
        isFetching: false,
        failure: false,
        errorMessage: false,
        value: action.payload,
      });
    case types.GET_ALL_SERVICE_CATEGORIES.FAILURE:
      return Object.assign({}, state, {
        init: false,
        isFetched: false,
        isRegistered: false,
        failure: true,
        errorMessage: action.payload.response,
      });
    case types.GET_ALL_SERVICE_CATEGORIES.INIT:
      return Object.assign({}, state, {
        init: true,
        isFetched: false,
        isFetching: false,
        errorMessage: false,
        value: []
      });
    default:
      return state;
  }
}