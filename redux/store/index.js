import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ordersReducer from '../reducers/index';

console.log(ordersReducer);
const store = createStore(
  combineReducers({ordersReducer}),
  composeWithDevTools()
)

export default store;
