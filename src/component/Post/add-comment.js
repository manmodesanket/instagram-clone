import React, { useEffect, useRef, useState } from "react";
import { useFirebase } from "../../context/firebase";
import { ToastContainer, toast } from "react-toastify";

export default function AddComment({ docId, comments, setComments }) {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useFirebase();
  const {
    user: { displayName },
  } = useFirebase();

  const commentRef = useRef(null);

  useEffect(() => {
    commentRef.current.focus();
  }, []);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([{ displayName, comment }, ...comments]);
    setComment("");

    firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
    toast.success("Comment Added");
  };

  return (
    <div className="border-t border-gray">
      <form
        className="flex w-full justify-between pl-0 pr-5"
        onSubmit={(event) =>
          comment.length >= 3
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          ref={commentRef}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className={`text-sm font-bold text-blue-500 ${
            !comment && "opacity-25"
          }`}
          type="button"
          disabled={comment.length < 3}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
