import React, { useEffect } from "react";
import { Header, Sidebar, Timeline } from "../component";
// Challenge

// Render all 3 components
// Tailwind CSS documentation for grid/grid-cols-3/gap-4

// figure out how to use justify between
// figure out how to use margin auto

// max-w-screen-lg

// Render Timeline and Sidebar in

export default function Home() {
  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <main className="w-full bg-gray-200 h-screen">
      <Header />
      <div className="w-11/12 sm:w-8/12 mx-auto mt-4 sm:flex">
        <Timeline />
        <Sidebar />
      </div>
    </main>
  );
}
