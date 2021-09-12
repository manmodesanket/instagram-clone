import React, { useState } from "react";
import { Heart } from "react-feather";
import { useFirebase } from "../../context/firebase";

export default function Actions({
  docId,
  totalLikes,
  likedPhoto,
  handleFocus,
}) {
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
      <div className="flex justify-between p4-">
        <div className="flex">
          <Heart
            onClick={() => handleToggleLiked((toggleLiked) => !toggleLiked)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleToggleLiked((toggleLiked) => !toggleLiked);
              }
            }}
            className={`w-8 mr-4 select-none cursor-pointer ${
              toggleLiked ? "fill-current text-red-primary" : "text-black-light"
            }`}
          />
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="font-bold">
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      </div>
    </>
  );
}
