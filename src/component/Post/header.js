import React from "react";
import Link from "next/link";

export default function Header({ username }) {
  return (
    <div className="flex border-b h-4 p-4 py-8">
      <div className="flex items-center">
        <Link href={`/profile/${username}`}>
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
}
