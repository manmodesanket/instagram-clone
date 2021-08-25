import { createContext, useContext } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_API_ID,
};
console.log(firebaseConfig);
const FirebaseContext = createContext(null);
//export default FirebaseContext;

export const useFirebase = () => useContext(FirebaseContext);

export function FirebaseProvider({ children }) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  const { FieldValue } = firebase.firestore;
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        FieldValue,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
