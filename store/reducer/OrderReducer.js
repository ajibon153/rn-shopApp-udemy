import { ADD_ORDER } from '../actions/OrderAction';
import Order from '../../models/order';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  //console.log('action', action);
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      //console.log('newOrder', newOrder);

      return { ...state, orders: state.orders.concat(newOrder) };
  }

  return state;
};
