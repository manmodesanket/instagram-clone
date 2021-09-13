import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useFirebase } from "../../context/firebase";

export default function Photos({ photos }) {
  return (
    <div className="border-t border-gray mt-12 pt-4">
      <div className="grid sm:grid-cols-3 grid-cols-2 gap-8 mt-4 mb-12">
        {!photos ? (
          <>
            {[...new Array(9)].map((_, index) => (
              <Skeleton key={index} count={1} width={320} height={400} />
            ))}
          </>
        ) : photos && photos.length > 0 ? (
          photos &&
          photos.map((photo) => (
            <div key={photo.docId} className="relative group">
              <Image src={photo.imageSrc} caption={photo.caption} />
            </div>
          ))
        ) : null}
      </div>

      {!photos ||
        (photos && photos.length === 0 && (
          <p className="text-center text-2xl">No Photos Yet</p>
        ))}
    </div>
  );
}

function Image({ src, caption }) {
  const [imageUrl, setImageUrl] = useState(null);
  const { storage } = useFirebase();

  useEffect(async () => {
    const storageRef = storage.ref();
    const url = await storageRef.child(src).getDownloadURL();
    setImageUrl(url);
  }, [src]);

  return (
    <div className="post__img">
      <img src={imageUrl} alt={caption} />
    </div>
  );
}
