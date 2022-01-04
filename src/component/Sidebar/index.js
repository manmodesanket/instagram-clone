import React from "react";
import useUser from "../../hooks/use-user";
import Suggestions from "./suggessions";
import User from "./user";

export default function Sidebar() {
  const {
    user: { userId },
  } = useUser();

  return (
    <div className="mt-14">
      <Suggestions userId={userId} />
    </div>
  );
}
