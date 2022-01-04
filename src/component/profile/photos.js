import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useFirebase } from "../../context/firebase";
import { getImageUrl } from "../../services/firebase";

export default function Photos({ photos, loadingPhotos }) {
  return (
    <div className="border-t border-gray mt-12 pt-4">
      <div className="grid sm:grid-cols-3 grid-cols-2 gap-8 mt-4 mb-12">
        {loadingPhotos && photos.length === 0 ? (
          <>
            {[...new Array(9)].map((_, index) => (
              <Skeleton key={index} count={1} width={320} height={400} />
            ))}
          </>
        ) : (
          photos &&
          photos.length > 0 &&
          photos.map((photo) => (
            <div key={photo.docId}>
              <Image
                src={photo.imageSrc}
                caption={photo.caption}
                id={photo.photoId}
              />
            </div>
          ))
        )}
      </div>

      {!photos ||
        (photos && photos.length === 0 && (
          <p className="text-center text-2xl">No Photos Yet</p>
        ))}
    </div>
  );
}

function Image({ src, caption, id }) {
  const [imageUrl, setImageUrl] = useState(null);
  const { storage } = useFirebase();

  useEffect(() => {
    let isActive = true;
    if (isActive) {
      const storageRef = storage.ref();
      let url = getImageUrl(src, storageRef);
      if (isActive) {
        url.then((data) => {
          setImageUrl(data);
        });
      }
    }
    () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="post__img">
      <a href={`/post/${id}`}>
        <img src={imageUrl} alt={caption} />
      </a>
    </div>
  );
}
