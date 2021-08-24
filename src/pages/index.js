import Head from "next/head";
import firebase from "firebase/app";
import "firebase/firestore";
import { FieldValue } from "../lib/firebase";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    let db = firebase.firestore();
    var docRef = db.collection("test").doc("test1");

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  return <div>Home</div>;
}
