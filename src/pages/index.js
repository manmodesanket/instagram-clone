import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Header, NavMobile, Sidebar, Timeline } from "../component";
import { useFirebase } from "../context/firebase";

export default function Home() {
  const { loading, user } = useFirebase();
  const router = useRouter();

  if (loading) {
    return (
      <main className="w-full bg-gray-200 h-screen">
        <Head>
          <title>Instagram</title>
        </Head>
        loading
      </main>
    );
  } else if (user != null || user != undefined) {
    return (
      <main className="w-full bg-gray-200 h-screen">
        <Head>
          <title>Instagram</title>
        </Head>
        <Header />
        <div className="w-11/12 sm:w-8/12 mx-auto mt-4 sm:flex">
          <Timeline />
          <Sidebar />
        </div>
        <NavMobile />
      </main>
    );
  } else if (!loading && user == null) {
    router.push("/login");
    return null;
  }
}
