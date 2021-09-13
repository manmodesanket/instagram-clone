import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/firebase";

export default function Image({ src, caption }) {
  const [imageUrl, setImageUrl] = useState(null);

  const { storage } = useFirebase();

  useEffect(async () => {
    const storageRef = storage.ref();
    const url = await storageRef.child(src).getDownloadURL();
    setImageUrl(url);
  }, [src]);

  if (src === null) {
    return <main className="w-full bg-gray-200 h-screen">loading</main>;
  }

  return (
    <div className="post__img">
      <img src={imageUrl} alt={caption} className="mx-auto" />
    </div>
  );
}
