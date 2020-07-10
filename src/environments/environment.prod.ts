import * as dotenv from 'dotenv';

dotenv.config();

export const environment = {
  production: true,
  firebaseConfig: {
    "apiKey": process.env.FIREBASE_API_KEY,
    "authDomain": process.env.FIREBASE_AUTH_DOMAIN,
    "databaseURL": process.env.FIREBASE_DB_URL,
    "projectId": process.env.FIREBASE_PROJECT_ID,
    "storageBucket": process.env.FIREBASE_STORAGE_BUCKET,
    "messagingSenderId": process.env.FIREBASE_MESSAGE_SEND_ID,
    "appId": process.env.FIREBASE_APP_ID
  },
  stravaConfig: {}
};
