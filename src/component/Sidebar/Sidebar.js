import React from "react";
import useUser from "../../hooks/use-user";

export default function Sidebar() {
  const { user: { docId, userId, following, username, fullName } = {} } =
    useUser();
  return <section className="hidden sm:block sm:4/12">Sidebar</section>;
}
