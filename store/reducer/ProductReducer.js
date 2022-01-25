import PRODUCTS from '../../data/dummy-data';
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
} from '../actions/ProductsAction';
import Product from '../../models/Product';

const initialState = {
  availableProducts: [],
  userProducts: [],
  // availableProducts: PRODUCTS,
  // userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      //console.log(SET_PRODUCTS, action.products);
      return {
        availableProducts: action.products,
        // userProducts: action.products.filter((prod) => prod.ownerId === 'u1'),
        userProducts: action.userProducts,
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );

      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      //console.log('productIndex', productIndex);
      //console.log('availableProductIndex', availableProductIndex);

      const updateProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      //console.log('updateProduct', updateProduct);

      const updateUserProduct = [...state.userProducts];
      updateUserProduct[productIndex] = updateProduct;
      //console.log('updateProduct', updateProduct);

      const updateAvailableProducts = [...state.availableProducts];
      updateAvailableProducts[availableProductIndex] = updateProduct;
      //console.log('updateAvailableProducts', updateAvailableProducts);

      return {
        ...state,
        availableProducts: updateAvailableProducts,
        userProducts: updateUserProduct,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pid
        ),
      };
  }

  return state;
};

export default ProductReducer;

// error
// expo install react-native-gesture-handle react-native-reanimated
