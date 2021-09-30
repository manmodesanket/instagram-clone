import React from "react";
import Link from "next/link";
import { Home, LogOut, PlusSquare, User } from "react-feather";
import useUser from "../../hooks/use-user";
import { useFirebase } from "../../context/firebase";

export default function NavMobile() {
  const { firebase } = useFirebase();
  const { user: activeUser } = useUser();
  return (
    <section className="sm:hidden w-full bg-white fixed bottom-0 h-10 flex items-center justify-around z-10">
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
        <Link href={`/profile/${activeUser.username}`} className="font-bold">
          <User />
        </Link>
      </div>

      <div className="w-1/2 h-full flex justify-center items-center cursor-pointer">
        <LogOut onClick={() => firebase.auth().signOut()} />
      </div>
    </section>
  );
}
