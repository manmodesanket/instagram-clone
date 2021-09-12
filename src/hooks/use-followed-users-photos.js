import { useState, useEffect } from "react";
import { useFirebase } from "../context/firebase";
import { getUserByUserId, getUserFollowedPhotos } from "../services/firebase";

export default function useFollowedUsersPhotos() {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = "" },
  } = useFirebase();

  useEffect(() => {
    async function getTimelinePhotos() {
      const followingUserIds = await getUserByUserId(userId);
      if (followingUserIds && followingUserIds[0].following.length > 0) {
        console.log(followingUserIds);
        const followedUserPhotos = await getUserFollowedPhotos(
          userId,
          followingUserIds[0].following
        );
        // we need to call a function that will get us the photos
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }

    getTimelinePhotos();
  }, [userId]);
  return { photos };
}
