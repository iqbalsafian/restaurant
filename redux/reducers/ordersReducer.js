import { SET_CURRENT_ORDER_ID } from '../constants/action-types';

export const INITIAL_STATE = {
  orders: [
    {
      id: 1011,
      status: 'new',
      timestamp: 100,
      total_price: 100,
      sales_tax: 10,
      custom_fees: 12,
      lists: [
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
      lists: [
        {
          title: 'chicken brodo',
          price: 9,
          remarks: 'Extra Cheese'
        },
        {
          title: 'proscuitto pie',
          price: 12,
          remarks: 'No Anchovies'
        }
      ]
    },
    {
      id: 1008,
      status: 'ready',
      timestamp: 100,
      total_price: 120,
      sales_tax: 12,
      custom_fees: 12,
      lists: [
        {
          title: 'chicken brodo',
          price: 9,
          remarks: 'Extra Cheese'
        },
        {
          title: 'proscuitto pie',
          price: 12,
          remarks: 'No Anchovies'
        }
      ]
    }
  ],
  currentOrderId: 1011,
};


const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_ORDER_ID:
      const orders = state.orders;
      const currentOrder = orders.find(order => order.id === action.payload);
      const currentOrderId = currentOrder.id
      return {
        orders,
        currentOrderId
      }
    default: {
      return state;
    }
  }
};

export default ordersReducer;
