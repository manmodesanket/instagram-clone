import React from "react";
import Image from "./image";
import Actions from "./action";
import Footer from "./footer";
import Header from "./header";

export default function Post({ content }) {
  return (
    <div className="rounded col-span-4 border bg-white mb-16">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
      />
      <Footer username={content.username} caption={content.caption} />
    </div>
  );
}
