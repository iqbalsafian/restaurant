import { CHANGE_CURRENT_ORDER } from "../constants/action-types";

export const changeCurrentOrder = orderId => (
  {
    type: CHANGE_CURRENT_ORDER,
    payload: orderId
  }
)
