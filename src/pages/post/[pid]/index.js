import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useFirebase } from "../../../context/firebase";
import useUser from "../../../hooks/use-user";
import { Instagram } from "react-feather";
import Post from "../../../component/Post";
import { getUserByUserId } from "../../../services/firebase";
import { Header, NavMobile } from "../../../component";

export default function PostPage() {
  const router = useRouter();
  const { pid } = router.query;
  const { loading, firebase, user: activeUser } = useFirebase();
  const { user } = useUser();
  const [dataLoading, setDataLoading] = useState(true);
  const [photo, setPhoto] = useState(null);

  useEffect(async () => {
    async function photoDetails() {
      const result = await firebase
        .firestore()
        .collection("photos")
        .where("photoId", "==", pid)
        .get();

      const photoDetails = {
        ...result.docs[0].data(),
        docId: result.docs[0].id,
      };

      const postUser = await getUserByUserId(photoDetails.userId);
      const { username } = postUser[0];
      const photo = { ...photoDetails, username };
      setPhoto(photo);
      setDataLoading(false);
    }
    if (pid && !loading && user != null && user != undefined) {
      photoDetails();
    }
  }, [pid, loading, user]);

  if (loading || dataLoading) {
    return (
      <main className="w-full bg-gray-200 h-screen">
        <Head>
          <link rel="icon" type="image/png" href="/instagram.png" />
          <title>Instagram</title>
        </Head>
        <div className="flex items-center justify-center h-screen">
          <Instagram />
        </div>
      </main>
    );
  } else if ((activeUser != null || activeUser != undefined) && !dataLoading) {
    return (
      <div className="h-screen w-full relative mt-16">
        <Head>
          <link rel="icon" type="image/png" href="/instagram.png" />
          <title>Instagram</title>
        </Head>
        <Header />
        <div className="sm:w-1/2 w-11/12 mx-auto mt-4">
          <Post content={photo} />
        </div>
        <NavMobile />
      </div>
    );
  } else if (!loading) {
    router.push("/login");
    return null;
  }
}
