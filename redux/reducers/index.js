import { combineReducers } from 'redux';

const INITIAL_STATE = {
  current: [],
  possible: [
    1111,
    1112,
    1113,
    1114,
    1115
  ]
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case expression:
    //
    //   break;
    default:
      return state;

  }
};

export default combineReducers({
  orders: ordersReducer
});
