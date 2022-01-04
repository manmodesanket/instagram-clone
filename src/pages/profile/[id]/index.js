import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Header, NavMobile } from "../../../component";
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
    <main className="w-full h-screen mt-14">
      <Head>
        <title>Instagram</title>
        <link rel="icon" type="image/png" href="/instagram.png" />
      </Head>
      <Header />
      {userExists && (
        <div className="mx-auto max-w-screen-lg">
          <UserProfile username={id} />
        </div>
      )}
      <NavMobile />
    </main>
  );
};

export default Profile;
