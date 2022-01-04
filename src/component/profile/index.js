import React, { useReducer, useEffect, useState } from "react";
import Header from "./header";
import Photos from "./photos";
import {
  getUserByUsername,
  getUserPhotosByUsername,
} from "../../services/firebase";

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
  profile: {},
  photosCollection: [],
  followerCount: 0,
};

export default function Profile({ username }) {
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  useEffect(() => {
    let isActive = true;
    async function getProfileInfoAndPhotos() {
      const [{ ...user }] = await getUserByUsername(username);
      const photos = await getUserPhotosByUsername(username);

      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }
    if (isActive) {
      getProfileInfoAndPhotos().then(() => {
        setLoadingPhotos(false);
      });
    }

    () => {
      isActive = false;
    };
  }, []);

  return (
    <>
      <Header
        photosCollection={photosCollection.length}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
        username={username}
      />
      <Photos photos={photosCollection} loadingPhotos={loadingPhotos} />
    </>
  );
}
