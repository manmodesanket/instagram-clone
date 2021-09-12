import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Header } from "../../../component";
import { getUserByUsername } from "../../../services/firebase";
import * as ROUTES from "../../../constants/routes";
import UserProfile from "../../../component/profile";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const [userExists, setUserExists] = useState(undefined);
  const { id } = router.query;
  useEffect(() => {
    async function checkUserExistsToLoadProfile() {
      if (id !== null && id !== undefined) {
        const doesUserExist = await getUserByUsername(id);
        if (!doesUserExist) {
          router.push(ROUTES.NOT_FOUND);
        } else {
          setUserExists(true);
        }
      }
    }
    checkUserExistsToLoadProfile();
  }, [id, router]);

  return (
    <main className="w-full bg-gray-200 h-screen">
      <Head>
        <title>Instagram</title>
      </Head>
      <Header />
      {userExists && (
        <div className="mx-auto max-w-screen-lg">
          <UserProfile username={id} />
        </div>
      )}
    </main>
  );
};

export default Profile;
