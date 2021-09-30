import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Post from "../Post";
import useFollowedUsersPhotos from "../../hooks/use-followed-users-photos";

export default function Timeline() {
  const [photoList, setPhotoList] = useState(null);
  const { photos } = useFollowedUsersPhotos();

  useEffect(() => {
    let isActive = true;
    if (isActive) {
      setPhotoList(photos);
    }
    () => {
      isActive = false;
    };
  }, [photos]);

  return (
    <section className="w-full sm:w-8/12 sm:px-4 mt-16">
      {!photoList ? (
        <Skeleton count={2} height={500} className="mb-4" />
      ) : (
        photoList.map((content) => (
          <Post key={content.docId} content={content} />
        ))
      )}
    </section>
  );
}
