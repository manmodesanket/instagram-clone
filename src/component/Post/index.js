import React from "react";
import { formatDistance } from "date-fns";
import Image from "./image";
import Actions from "./action";
import Footer from "./footer";
import Header from "./header";
import Comments from "./comment";

export default function Post({ content, postPage = false }) {
  return (
    <div className="rounded col-span-4 border bg-white mb-8">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        id={content.photoId}
      />
      <Footer username={content.username} caption={content.caption} />
      <p className="text-gray uppercase text-xs mt-2 p-2">
        {formatDistance(content.dateCreated, new Date())} ago
      </p>
      {postPage && (
        <Comments docId={content.docId} comments={content.comments} />
      )}
    </div>
  );
}
