import router from "next/router";
import Head from "next/head";
import React from "react";
import { useFirebase } from "../context/firebase";
import { Instagram } from "react-feather";
import NavMobile from "../component/NavMobile/NavMobile";

export default function Profile() {
  const { firebase, loading, user } = useFirebase();

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  if (loading) {
    return (
      <div className="container mx-auto">
        <Head>
          <title>Profile</title>
        </Head>
        <div className="flex items-center justify-center h-screen">
          <Instagram />
        </div>
      </div>
    );
  } else if (user !== null) {
    return (
      <main className="w-full bg-gray-200 h-screen">
        <Head>
          <title>Instagram</title>
        </Head>
        <p>Hello {user.email}</p>
        <button onClick={() => handleLogout()}>Logout</button>
        <NavMobile />
      </main>
    );
  } else if (!loading && user == null) {
    router.push("/login");
    return null;
  }
}
