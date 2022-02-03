import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        () => {
          //SUCCESS
          resolve();
        },
        (_, err) => {
          //FAILED
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
        [title, imageUri, address, lat, lng],
        (_, res) => {
          //SUCCESS
          resolve(res);
        },
        (_, err) => {
          //FAILED
          reject(err);
        }
      );
    });
  });
  return promise;
  // (${title}, ${imageUri}, ${address}, ${lat}, ${lng})
};

export const fetchPlace = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, res) => {
          //SUCCESS
          //console.log('fetchPlace', res);
          resolve(res);
        },
        (_, err) => {
          //FAILED
          reject(err);
        }
      );
    });
  });
  return promise;
  // (${title}, ${imageUri}, ${address}, ${lat}, ${lng})
};
