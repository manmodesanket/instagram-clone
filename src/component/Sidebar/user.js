import React from "react";
import Link from "next/link";
import Skelton from "react-loading-skeleton";

const User = ({ username, fullName }) =>
  !username || !fullName ? (
    <Skelton count={1} height={61} />
  ) : (
    <Link
      href={`/p/${username}`}
      className="grid grid-cols-4 gap-4 mb-4 items-center"
    >
      <>
        <div className="col-span-3">
          <p className="font-bold text-sm">{username}</p>
          <p className="text-sm">{fullName}</p>
        </div>
      </>
    </Link>
  );

export default User;
