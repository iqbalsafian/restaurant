import { CHANGE_CURRENT_ORDER } from '../constants/action-types';
import { combineReducers } from 'redux';

const INITIAL_STATE = {
  orders: [
    {
      id: 1011,
      status: 'new',
      timestamp: 100,
      total_price: 100,
      sales_tax: 10,
      custom_fees: 12,
      list: [
        {
          title: 'chicken brodo',
          price: 9
        },
        {
          title: 'proscuitto pie',
          price: 12
        }
      ]
    },
    {
      id: 1012,
      status: 'new',
      timestamp: 100,
      total_price: 100,
      sales_tax: 10,
      custom_fees: 12,
      list: [
        {
          title: 'chicken brodo',
          price: 9
        },
        {
          title: 'proscuitto pie',
          price: 12
        }
      ]
    }
  ],
  currentOrderId: 1011
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_ORDER:
      const orders = state.orders;
      const currentOrder = orders.find(order => order.id === action.payload);
      const currentOrderId = 1011
      return {
        orders,
        currentOrder,
        currentOrderId
      }
    default:
      return state;
  }
};

export default combineReducers({ordersReducer});
