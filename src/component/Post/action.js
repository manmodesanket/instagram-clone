import React, { useState } from "react";
import { Heart, MessageCircle } from "react-feather";
import { useFirebase } from "../../context/firebase";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Actions({ docId, totalLikes, likedPhoto, id }) {
  const [isLiked, setIsLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase, FieldValue } = useFirebase();

  const {
    user: { uid: userId = "" },
  } = useFirebase();

  const handleToggleLiked = async () => {
    setIsLiked((toggleLiked) => !toggleLiked);
    let likeFlag = isLiked ? true : false;
    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        likes: isLiked
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      });
    setLikes((likes) => (isLiked ? likes - 1 : likes + 1));
    if (!likeFlag) {
      toast.success("Photo Liked");
    } else {
      toast.success("Photo Disliked");
    }
  };
  return (
    <>
      <div className="flex justify-between">
        <div className="flex py-1">
          <Heart
            onClick={handleToggleLiked}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleToggleLiked();
              }
            }}
            className={`w-8 mr-4 select-none cursor-pointer ${
              isLiked ? "fill-current text-red-500" : "text-black-light"
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
