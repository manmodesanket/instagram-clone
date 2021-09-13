import React from "react";
import Link from "next/link";
import { Home, User, PlusSquare } from "react-feather";
import useUser from "../../hooks/use-user";

export default function Header() {
  const { user: activeUser } = useUser();

  return (
    <header className="w-full bg-white h-12 flex items-center border-b border-gray-300">
      <div className="w-8/12 mx-auto flex justify-center ">
        <figure className="sm:w-8/12 h-8">
          <Link href="/">
            <img src="/logo.png" alt="Instagram" className="h-full" />
          </Link>
        </figure>
        <div className="hidden w-4/12 sm:flex">
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
            <Link
              href={`/profile/${activeUser.username}`}
              className="font-bold"
            >
              <User />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
