import firebase, { firebaseDb } from '../../config/firebase';
import { getDatabase, ref, child, set, get, onValue } from 'firebase/database';

import Product from '../../models/Product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

// const db = getDatabase();
const db = firebaseDb;

export const fetchProducts = () => (dispatch) => {
  try {
    const db = getDatabase();
    const url = ref(db, 'products/');

    onValue(url, (snapshot) => {
      const data = [];
      let snapVal = snapshot.val();
      if (snapVal) {
        Object.keys(snapshot.val()).map((key) => {
          data.push(
            new Product(
              key,
              'u1',
              snapVal[key].title,
              snapVal[key].imageUrl,
              snapVal[key].description,
              snapVal[key].price
            )
          );
        });
      }
      console.log('fetchProducts', data);
      dispatch({ type: SET_PRODUCTS, products: data });
    });
  } catch (err) {
    throw err;
  }
  // return async (dispatch) => {
  //   const response = await fetch(
  //     'https://teseatit.firebaseio.com/products.json'
  //   );
  //   const resData = await response.json();
  // //console.log('resData', resData);
  //   dispatch({ type: SET_PRODUCTS, products: [] });
  // };
};

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  const db = getDatabase();

  // console.log('createProduct === ', title, description, imageUrl, price);
  return async (dispatch) => {
    // any async code you want
    let productData = {
      title,
      description,
      imageUrl,
      price,
    };
    //console.log('productData', productData);

    return set(ref(db, 'products/' + title), productData)
      .then((res) => {
        //console.log('createProduct res', res);
        // dispatch({ type: 'SET_PRODUCTS', value: false });

        dispatch({
          type: CREATE_PRODUCT,
          productData: { ...productData, id: productData.title },
        });
        return true;
      })
      .catch((err) => {
        //console.log('createProduct err', err);
        return false;
      });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  //console.log('updateProduct action === ', id, title, description, imageUrl);
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: { title, description, imageUrl },
  };
};
