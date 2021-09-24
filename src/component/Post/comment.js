import React, { useState } from "react";
import { useFirebase } from "../../context/firebase";
import Link from "next/link";
import AddComment from "./add-comment";

export default function Comments({ docId, comments: allComments }) {
  const [comments, setComments] = useState(allComments);
  const { user } = useFirebase();
  return (
    <div className="">
      {comments.map((item) => (
        <p
          key={`${item.comment}-${item.displayName}`}
          className="mb-1 px-2 pb-1 cursor-pointer"
        >
          <Link href={`/profile/${item.displayName}`}>
            <span className="mr-1 font-bold">{item.displayName}</span>
          </Link>
          <span>{item.comment}</span>
        </p>
      ))}
      {user && (
        <AddComment
          docId={docId}
          comments={comments}
          setComments={setComments}
        />
      )}
    </div>
  );
}
