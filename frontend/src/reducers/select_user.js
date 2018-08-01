import * as types from '../actions/actionTypes';

const initialState = {
  value: {}
};

export default (state = initialState, action) => {
  switch(action.type) {
    case types.SELECTED_USER:
      return Object.assign({}, state, {
        value: action.payload,
      });
    default:
      return state;
  }
}