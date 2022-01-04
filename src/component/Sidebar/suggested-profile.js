import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  getUserByUserId,
  updateUserFollowing,
  updateFollowedUserFollowers,
  getProfileUrl,
} from "../../services/firebase";
import { useFirebase } from "../../context/firebase";

export default function SuggestedProfile({
  userDocId,
  username,
  profileId,
  userId,
}) {
  const [followed, setFollowed] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const { storage } = useFirebase();

  useEffect(async () => {
    let isActive = true;
    const storageRef = storage.ref();
    let url = getProfileUrl(username, storageRef);
    url.then((data) => {
      if (isActive) {
        setProfilePicture(data);
      }
    });
    () => {
      isActive = false;
    };
  }, [userId]);

  async function handleFollowUser() {
    setFollowed(true);

    const [{ docId }] = await getUserByUserId(userId);
    await updateUserFollowing(docId, profileId);
    await updateFollowedUserFollowers(userDocId, userId);
  }

  return (
    !followed && (
      <div className="flex flex-row items-center align-items justify-between">
        <div className="flex items-center justify-between">
          {profilePicture && (
            <img
              className="rounded-full w-8 flex mr-3"
              src={profilePicture}
              alt={`Follow ${username}`}
            />
          )}
          <Link href={`/profile/${username}`}>
            <p className="font-bold text-sm cursor-pointer">{username}</p>
          </Link>
        </div>
        <div className="flex">
          <button
            className="bg-blue-500 font-bold text-sm rounded text-white w-14 h-8 ml-2"
            type="button"
            onClick={handleFollowUser}
          >
            Follow
          </button>
        </div>
      </div>
    )
  );
}
