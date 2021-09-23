import React, { useState } from "react";
import { Heart, MessageCircle } from "react-feather";
import { useFirebase } from "../../context/firebase";
import Link from "next/link";

export default function Actions({ docId, totalLikes, likedPhoto, id }) {
  const [toggleLiked, setToggleLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase, FieldValue } = useFirebase();

  const {
    user: { uid: userId = "" },
  } = useFirebase();

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);
    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        likes: toggleLiked
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      });
    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };
  return (
    <>
      <div className="flex justify-between">
        <div className="flex py-1">
          <Heart
            onClick={() => handleToggleLiked((toggleLiked) => !toggleLiked)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleToggleLiked((toggleLiked) => !toggleLiked);
              }
            }}
            className={`w-8 mr-4 select-none cursor-pointer ${
              toggleLiked ? "fill-current text-red-500" : "text-black-light"
            }`}
          />
          <Link href={`/post/${id}`}>
            <MessageCircle className="cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="px-2 py-0">
        <p className="font-bold">
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      </div>
    </>
  );
}
