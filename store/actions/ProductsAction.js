import firebase, { firebaseDb } from '../../config/firebase';
import {
  getDatabase,
  ref,
  push,
  child,
  set,
  get,
  onValue,
  update,
  remove,
} from 'firebase/database';

import Product from '../../models/Product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

const db = firebaseDb;

export const fetchProducts = () => (dispatch, getState) => {
  let userId = getState().auth.userId;
  try {
    const url = ref(db, 'products/');
    //console.log('fetchProducts2');

    onValue(url, (snapshot) => {
      const data = [];
      let snapVal = snapshot.val();
      // console.log('snapVal', snapVal);
      if (snapVal) {
        Object.keys(snapshot.val()).map((key) => {
          data.push(
            new Product(
              key,
              snapVal[key].ownerId,
              snapVal[key].title,
              snapVal[key].imageUrl,
              snapVal[key].description,
              snapVal[key].price
            )
          );
        });
      }
      // console.log('==========================');
      // console.log('fetchProducts3', data);
      dispatch({
        type: SET_PRODUCTS,
        products: data,
        userProducts: data.filter((item) => item.ownerId === userId),
      });
    });
  } catch (err) {
    //console.log('fetchProducts', err);
    throw err;
  }
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    // console.log('delete id', id);

    // const deleted = await remove(ref(db), deletes);
    await remove(ref(db, 'products/' + id));
    // console.log('deleted', deleted);

    dispatch({ type: DELETE_PRODUCT, pid: id });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  // const db = getDatabase();

  // console.log('createProduct === ', title, description, imageUrl, price);
  return async (dispatch, getState) => {
    // any async code you want
    let token = getState().auth.token;
    let userId = getState().auth.userId;
    //console.log('token', token);
    //console.log('userId', userId);
    let productData = {
      title,
      description,
      imageUrl,
      price,
      ownerId: userId,
    };
    //console.log('productData', productData);
    // const newPostKey = push(child(ref(db), 'posts')).key;
    return set(ref(db, 'products/' + userId), productData)
      .then((res) => {
        // console.log(
        //   '================ createProduct ================',
        //   productData
        // );
        // dispatch({ type: 'SET_PRODUCTS', value: false });

        dispatch({
          type: CREATE_PRODUCT,
          productData: {
            ...productData,
            id: productData.title,
            ownerId: userId,
          },
        });
        return true;
      })
      .catch((err) => {
        //console.log('createProduct err', err);
        return false;
      });
  };
};

export const updateProduct = (id, title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    //console.log('updateProduct action === ', id, title, description, imageUrl);

    let token = getState().auth.token;
    let userId = getState().auth.userId;
    //console.log('token', token);
    //console.log('userId', userId);
    let productData = {
      title,
      description,
      imageUrl,
      price,
      ownerId: userId,
    };

    const updates = {};
    updates['/products/' + id] = productData;
    // console.log('updates', updates);

    const updated = await update(ref(db), updates);
    //console.log('updated', updated);

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: { title, description, imageUrl },
    });
  };
};
