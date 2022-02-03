import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import ENV from '../../env';
import { insertPlace, fetchPlace } from '../../helper/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACE = 'SET_PLACE';

export const addPlace = (title, image, location) => {
  console.log('addPlace', title, image, location);
  return async (dispatch) => {
    let latitude = location.pickedLocation.latitude;
    let longitude = location.pickedLocation.longitude;
    let address = 'Dummy address ' + latitude + ' ' + longitude;

    // let locationData = await translateAddress(latitude, longitude);
    // console.log('locationData', locationData);
    // if (locationData) {
    //   const resData = await locationData.json();
    //   if (!resData.results) {
    //     throw new Error('Something went wrong!');
    //   }
    //   address = resData.results[0].formatted_address;
    // }
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        latitude,
        longitude
      );
      //console.log('addPlace dbResult', dbResult);
      let data = {
        id: dbResult.insertId,
        title,
        imageUri: newPath,
        address,
        coords: {
          latitude,
          longitude,
        },
      };
      console.log('data', data);
      dispatch({ type: ADD_PLACE, data });
    } catch (error) {
      //console.log(error);
      throw error;
    }
  };
};

const translateAddress = async (latitude, longitude) => {
  let APIKEY = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
    ENV().googleApiKey
  }`;
  console.log('APIKEY', APIKEY);

  const response = await fetch(APIKEY);
  // .then((res) => res)
  // .catch((err) => {
  //   console.log(err);
  //   return { ok: false };
  // });
  console.log('response', response);

  if (!response.ok) {
    throw new Error('Something went wrong!', err);
  }
  return response;
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlace();
      //console.log('loadPlaces dbResult', dbResult.rows._array);
      dispatch({ type: SET_PLACE, places: dbResult.rows._array });
    } catch (error) {
      //console.log(error);
      throw error;
    }
  };
};
