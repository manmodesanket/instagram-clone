import React from "react";
import Skeleton from "react-loading-skeleton";
import Post from "../Post";
import useFollowedUsersPhotos from "../../hooks/use-followed-users-photos";

export default function Timeline() {
  const { photos } = useFollowedUsersPhotos();
  return (
    <section className="w-full sm:w-8/12 sm:px-4">
      {!photos ? (
        <Skeleton count={2} height={500} className="mb-5" />
      ) : (
        photos.map((content) => <Post key={content.docId} content={content} />)
      )}
    </section>
  );
}
