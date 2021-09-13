import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_API_ID,
};

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const { FieldValue } = firebase.firestore;

export function FirebaseProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const storage = firebase.storage();
  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        setUser(user);
        setLoadingAuth(false);
      } else {
        setUser(null);
        setLoadingAuth(false);
      }
    });
    return () => listener();
  }, []);
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        FieldValue,
        loading: loadingAuth,
        user,
        storage,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export { firebase, FieldValue };
