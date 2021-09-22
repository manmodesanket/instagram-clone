import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import * as FIREBASE_CONSTANTS from "../constants/firebase";

const firebaseConfig = {
  apiKey: FIREBASE_CONSTANTS.FIREBASE_API_ID,
  authDomain: FIREBASE_CONSTANTS.FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_CONSTANTS.FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_CONSTANTS.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_CONSTANTS.FIREBASE_MESSAGING_ID,
  appId: FIREBASE_CONSTANTS.FIREBASE_API_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const { FieldValue } = firebase.firestore;

export { firebase, FieldValue };
