import React from "react";
import Skeleton from "react-loading-skeleton";
import Post from "../Post";
import useFollowedUsersPhotos from "../../hooks/use-followed-users-photos";

export default function Timeline() {
  const { photos } = useFollowedUsersPhotos();
  return (
    <section className="bg-gray-100 w-full sm:w-8/12 sm:px-4">
      {!photos ? (
        <Skeleton count={1} width={640} height={500} className="mb-5" />
      ) : (
        photos.map((content) => <Post key={content.docId} content={content} />)
      )}
    </section>
  );
}
