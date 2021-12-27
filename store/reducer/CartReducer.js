import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/CartAction';
import CartItem from '../../models/cart-item';
import { ADD_ORDER } from '../actions/OrderAction';
import { DELETE_PRODUCT } from '../actions/ProductsAction';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;
      if (state.items[addedProduct.id]) {
        // sudah ada
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        // belum ada
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updateCartItems;
      //console.log('selectedCartItem', selectedCartItem);
      if (currentQty > 1) {
        // reduce
        const updateCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        //console.log('updateCartItem', updateCartItem);
        updateCartItems = { ...state.items, [action.pid]: updateCartItem };
      } else {
        updateCartItems = { ...state.items };
        delete updateCartItems[action.pid];
      }
      //console.log('updateCartItems', updateCartItems);
      return {
        ...state,
        items: updateCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItem = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      delete updatedItem[action.pid];
      return {
        ...state,
        items: updatedItem,
        totalAmount: state.totalAmount - itemTotal,
      };
  }

  return state;
};
