import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { useFirebase } from "../../context/firebase";
import useUser from "../../hooks/use-user";
import {
  isUserFollowingProfile,
  toggleFollow,
  getProfileUrl,
} from "../../services/firebase";

export default function Header({
  followerCount: followers,
  setFollowerCount,
  username,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    following = [],
  },
}) {
  const { user } = useUser();
  const { storage, user: activeUser } = useFirebase();
  const [profilePicture, setProfilePicture] = useState(null);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow =
    activeUser && user.username && user.username !== username;

  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  const handleToggleFollow = async () => {
    if (mounted.current) {
      setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
      setFollowerCount({
        followerCount: isFollowingProfile ? followers - 1 : followers + 1,
      });
      await toggleFollow(
        isFollowingProfile,
        user.docId,
        profileDocId,
        profileUserId,
        user.userId
      );
    }
  };
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
  }, [user.username]);

  useEffect(() => {
    let isActive = true;
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      if (isActive) {
        setIsFollowingProfile(isFollowing);
      }
    };

    if (user.username && profileUserId && isActive) {
      isLoggedInUserFollowingProfile();
    }
    () => {
      isActive = false;
    };
  }, [user.username, profileUserId]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg mt-8">
      <div className="container flex justify-center">
        {profilePicture && (
          <img
            className="rounded-full sm:h-40 sm:w-40 h-20 w-20 flex my-auto"
            alt={profilePicture}
            src={profilePicture}
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{username}</p>
          {user && username === user.username && (
            <Link href="/edit">
              <button
                type="submit"
                className="bg-gray-500 text-white px-2 rounded h-8 font-bold"
              >
                Edit Details
              </button>
            </Link>
          )}
          {activeBtnFollow && (
            <button
              className="bg-blue-500 font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {followers === undefined || following === undefined ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{followers}</span>{" "}
                {followers === 1 ? "follower" : "followers"}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following.length}</span> following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!fullName ? <Skeleton count={1} height={24} /> : fullName}
          </p>
        </div>
      </div>
    </div>
  );
}
