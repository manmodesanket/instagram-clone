import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Home, User, PlusSquare, LogOut } from "react-feather";
import useUser from "../../hooks/use-user";
import { useFirebase } from "../../context/firebase";
import { ToolTip } from "..";

export default function Header() {
  const { user: activeUser } = useUser();
  const { firebase, user } = useFirebase();
  const router = useRouter();

  return (
    <header className="w-full fixed top-0 bg-white h-12 flex items-center border-b border-gray-300 z-10">
      <div className="w-8/12 mx-auto flex justify-center ">
        <figure className="sm:w-8/12 h-8">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Instagram"
              className="h-full cursor-pointer"
            />
          </Link>
        </figure>
        <div className="hidden w-4/12 sm:flex">
          <div className="w-1/2 h-full flex justify-center items-center">
            <ToolTip text="Home">
              <Link href="/" className="font-bold">
                <Home className="cursor-pointer" />
              </Link>
            </ToolTip>
          </div>
          <div className="w-1/2 h-full flex justify-center items-center">
            <ToolTip text="Post">
              <Link href="/post" className="font-bold">
                <PlusSquare className="cursor-pointer" />
              </Link>
            </ToolTip>
          </div>
          {user != null && (
            <div className="w-1/2 h-full flex justify-center items-center">
              <ToolTip text="Profile">
                <Link
                  href={`/profile/${activeUser.username}`}
                  className="font-bold"
                >
                  <User className="cursor-pointer" />
                </Link>
              </ToolTip>
            </div>
          )}
          {user !== null && (
            <div className="w-1/2 h-full flex justify-center items-center cursor-pointer">
              <ToolTip text="Logout">
                <LogOut
                  onClick={() => {
                    firebase.auth().signOut();
                    router.push("/login");
                  }}
                />
              </ToolTip>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
