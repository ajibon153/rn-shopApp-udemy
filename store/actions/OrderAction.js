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
import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDER = 'SET_ORDER';

const db = firebaseDb;

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    let userId = getState().auth.userId;
    try {
      const url = ref(db, 'orders/' + userId);

      onValue(url, (snapshot) => {
        const data = [];
        let snapVal = snapshot.val();
        //console.log('snapVal', snapVal);

        if (snapVal) {
          Object.keys(snapshot.val()).map((key) => {
            data.push(
              new Order(
                key,
                snapVal[key].items,
                snapVal[key].amount,
                new Date(snapVal[key].date)
              )
            );
          });
        }
        //console.log('fetchOrders', data);
        dispatch({ type: SET_ORDER, orders: data });
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  // const db = getDatabase();
  return async (dispatch, getState) => {
    const date = new Date().toISOString();
    let token = getState().auth.token;
    let userId = getState().auth.userId;
    // any async code you want
    let orderData = {
      items: cartItems,
      amount: totalAmount,
      date,
    };
    //console.log('orderData', orderData);
    const newPostKey = push(child(ref(db), 'posts')).key;
    return set(ref(db, 'orders/' + userId + '/' + newPostKey), orderData)
      .then((res) => {
        //console.log('addOrder', res);
        dispatch({
          type: ADD_ORDER,
          orderData: { ...orderData, id: newPostKey },
        });
        return true;
      })
      .catch((err) => {
        //console.log('createProduct err', err);
        throw new Error('Something Wrong !' + err.message);
      });
  };
};
