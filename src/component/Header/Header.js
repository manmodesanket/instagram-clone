import React from "react";
import Link from "next/link";
export default function Header() {
  return (
    <header className="w-full bg-white h-12 flex items-center">
      <div className="w-8/12 mx-auto flex justify-center sm:block">
        <figure className="h-8">
          <Link href="/">
            <img src="/logo.png" alt="Instagram" className="h-full" />
          </Link>
        </figure>
      </div>
    </header>
  );
}
