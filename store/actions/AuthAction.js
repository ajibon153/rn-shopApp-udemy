import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

const auth = getAuth();

export const Authenticate = (userId, token, expireTime) => {
  //console.log('Authenticate', userId, token);
  return (dispatch) => {
    if (expireTime) dispatch(setLogoutTimer(parseInt(expireTime)));
    dispatch({ type: AUTHENTICATE, userId, token });
  };
};

export const signupAuthenticate = (email, password) => {
  return async (dispatch, getState) => {
    let data;
    //console.log('getState', getState());
    // console.log('auth', auth);
    //console.log('email', email);
    //console.log('password', password);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        data = {
          success: true,
          uid: user.uid,
          accessToken: user.stsTokenManager.accessToken,
          expire: user.stsTokenManager.expirationTime,
        };
        // data = user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const message = getErrorMessage(errorCode);
        // console.log('error signup', error);

        data = { success: false, error: message };
        throw new Error(message);
      });
    // console.log('data', data);
    //console.log('user signup', data);

    dispatch(Authenticate(data.uid, data.accessToken, data.expire));
    saveDataToStorage(data.accessToken, data.uid, data.expire);

    return data;
  };
};

export const signinAuthenticate = (email, password) => {
  return async (dispatch, getState) => {
    let data;
    //console.log('getState', getState());
    // console.log('auth', auth);
    //console.log('email', email);
    //console.log('password', password);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        data = {
          success: true,
          uid: user.uid,
          accessToken: user.stsTokenManager.accessToken,
          expire: user.stsTokenManager.expirationTime,
        };
        // data = user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const message = getErrorMessage(errorCode);
        // console.log('error signup', error);

        data = { success: false, error: message };
        throw new Error(message);
      });
    // console.log('data', data);
    //console.log('user signin', data);

    dispatch(Authenticate(data.uid, data.accessToken, data.expire));
    saveDataToStorage(data.accessToken, data.uid, data.expire);
    return data;
  };
};

export const onAuthenticate = (email, password) => {
  return async (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const uid = user.uid;
      } else {
        // User is signed out
      }
    });
    dispatch({ type: ONAUTH });
  };
};

export const logoutAct = () => {
  return (dispatch) => {
    // clearLogoutTimer();
    //console.log('logoutAct');
    AsyncStorage.removeItem('userData');
    dispatch({ type: LOGOUT });
  };
};

// ===============================

const clearLogoutTimer = (timer) => {
  if (timer) clearTimeout(timer);
};

const setLogoutTimer = (expireTime) => {
  return (dispatch) => {
    //console.log('setLogoutTimer', expireTime);
    setTimeout(() => {
      dispatch(logoutAct());
    }, expireTime);
  };
};

const saveDataToStorage = (token, userId, expire) => {
  //console.log('saveDataToStorage', token, userId, expire);
  const expirationDate = new Date(
    new Date().getTime() + parseInt(expire) * 1000
  ).toISOString();
  //console.log('expirationDate', expirationDate);
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate,
    })
  );
};

function getErrorMessage(error) {
  //console.log('getErrorMessage', error);
  let errmes = [
    {
      error: 'auth/user-not-found',
      message: 'Akun tidak terdaftar',
    },
    {
      error: 'auth/email-already-exists',
      message: 'Email sudah terdaftar',
    },
    {
      error: 'auth/invalid-email',
      message: 'Email salah',
    },
    {
      error: 'auth/invalid-email-verified',
      message: 'Email tidak terverifikasi',
    },
    {
      error: 'auth/invalid-password',
      message: 'Password salah',
    },
    {
      error: 'auth/id-token-expired',
      message: 'Sesi telah berakhir, silahkan login kembali',
    },
    {
      error: 'auth/session-cookie-expired',
      message: 'Sesi telah berakhir, silahkan login kembali',
    },
    {
      error: 'auth/internal-error',
      message: 'Gagal authentifikasi',
    },
  ];
  let find = errmes.find((item) => item.error === error);
  //console.log('find', find, error);
  if (!find) find = { message: 'Gagal authentifikasi' };
  return find.message;
}

// ===============================
