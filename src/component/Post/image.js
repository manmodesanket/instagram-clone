import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/firebase";
import { getImageUrl } from "../../services/firebase";

export default function Image({ src, caption }) {
  const [imageUrl, setImageUrl] = useState(null);

  const { storage } = useFirebase();

  useEffect(async () => {
    let isActive = true;
    if (isActive) {
      const storageRef = storage.ref();
      let url = getImageUrl(src, storageRef);
      url.then((data) => {
        if (isActive) {
          setImageUrl(data);
        }
      });
    }
    () => {
      isActive = false;
    };
  }, []);

  if (src === null) {
    return <main className="w-full bg-gray-200 h-screen">loading</main>;
  }

  return (
    <div className="post__img">
      {imageUrl && <img src={imageUrl} alt={caption} className="mx-auto" />}
    </div>
  );
}
