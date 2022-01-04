import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useFirebase } from "../../context/firebase";
import { getProfileUrl } from "../../services/firebase";

export default function Header({ username }) {
  const { storage } = useFirebase();
  const [profilePicture, setProfilePicture] = useState(null);

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
  }, [username]);
  return (
    <div className="flex border-b h-4 p-4 py-8">
      <div className="flex items-center">
        {profilePicture && (
          <img
            className="rounded-full w-8 flex mr-3"
            src={profilePicture}
            alt={`${username}`}
          />
        )}

        <Link href={`/profile/${username}`}>
          <p className="font-bold cursor-pointer">{username}</p>
        </Link>
      </div>
    </div>
  );
}
