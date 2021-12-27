// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDKvc68UW_Lo1q2V2okkUj2O7O-ZUMdLAM',
  authDomain: 'teseatit.firebaseapp.com',
  databaseURL: 'https://teseatit.firebaseio.com',
  projectId: 'teseatit',
  storageBucket: 'teseatit.appspot.com',
  messagingSenderId: '284642935350',
  appId: '1:284642935350:web:0b4ba5b240a6d39d184e97',
};

// Initialize Firebase
const firebaseInit = initializeApp(firebaseConfig);
const firebaseDb = getDatabase(firebaseInit);
const firebaseStorage = getStorage(firebaseInit, 'gs://teseatit.appspot.com');

export default firebaseInit;
export { firebaseDb, firebaseStorage };
