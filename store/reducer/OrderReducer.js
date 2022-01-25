import { ADD_ORDER, SET_ORDER } from '../actions/OrderAction';
import Order from '../../models/order';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  //console.log('action', action);
  switch (action.type) {
    case SET_ORDER:
      return { orders: action.orders };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      //console.log('newOrder', newOrder);

      return { ...state, orders: state.orders.concat(newOrder) };
  }

  return state;
};
