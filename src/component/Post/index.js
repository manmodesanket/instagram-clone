import React from "react";
import Image from "./image";

export default function Post({ content }) {
  console.log(content);
  return (
    <div className="rounded col-span-4 border bg-white mb-16">
      <Image src={content.imageSrc} caption={content.caption} />
    </div>
  );
}
