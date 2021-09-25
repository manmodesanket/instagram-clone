import React, { useState } from "react";
import Link from "next/link";
import {
  getUserByUserId,
  updateUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";

export default function SuggestedProfile({
  userDocId,
  username,
  profileId,
  userId,
}) {
  const [followed, setFollowed] = useState(false);

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
          <Link href={`/profile/${username}`}>
            <p className="font-bold text-sm cursor-pointer">{username}</p>
          </Link>
        </div>
        <div className="flex">
          <button
            className="bg-blue-500 font-bold text-sm rounded text-white w-14 h-8"
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
