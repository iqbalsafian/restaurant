import { SET_CURRENT_ORDER_ID } from "../constants/action-types";

export const setCurrentOrder = orderId => (
  {
    type: SET_CURRENT_ORDER_ID,
    payload: orderId
  }
)
