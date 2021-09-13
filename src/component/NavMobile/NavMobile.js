import React from "react";
import Link from "next/link";
import { Home, PlusSquare, User } from "react-feather";

export default function NavMobile() {
  return (
    <section className="sm:hidden w-full bg-white absolute sticky bottom-0 h-10 flex items-center justify-around">
      <div className="w-1/2 h-full flex justify-center items-center">
        <Link href="/" className="font-bold">
          <Home />
        </Link>
      </div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <Link href="/post" className="font-bold">
          <PlusSquare />
        </Link>
      </div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <Link href="/profile" className="font-bold">
          <User />
        </Link>
      </div>
    </section>
  );
}
