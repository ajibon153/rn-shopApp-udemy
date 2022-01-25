import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const ONAUTH = 'ONAUTH';

const auth = getAuth();

export const signupAuthenticate = (email, password) => {
  return async (dispatch, getState) => {
    let data;
    //console.log('getState', getState());
    // console.log('auth', auth);
    console.log('email', email);
    console.log('password', password);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log('user signup', user);
        data = {
          success: true,
          uid: user.uid,
          accessToken: user.stsTokenManager.accessToken,
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
    dispatch({ type: SIGNUP, data });
    return data;
  };
};

export const signinAuthenticate = (email, password) => {
  return async (dispatch, getState) => {
    let data;
    //console.log('getState', getState());
    // console.log('auth', auth);
    console.log('email', email);
    console.log('password', password);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user signin', user);
        data = {
          success: true,
          uid: user.uid,
          accessToken: user.stsTokenManager.accessToken,
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
    dispatch({ type: SIGNUP, data });
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

// ===============================
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
