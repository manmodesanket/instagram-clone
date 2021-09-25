import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/firebase";
import { getImageUrl } from "../../services/firebase";

export default function Image({ src, caption }) {
  const [imageUrl, setImageUrl] = useState(null);

  const { storage } = useFirebase();

  useEffect(async () => {
    if (src) {
      const storageRef = storage.ref();
      let url = getImageUrl(src, storageRef);
      url.then((data) => setImageUrl(data));
    }
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
