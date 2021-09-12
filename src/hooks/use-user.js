import { useState, useEffect } from "react";
import { getUserByUserId } from "../services/firebase";
import { useFirebase } from "../context/firebase";

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useFirebase();
  useEffect(() => {
    async function getUserObjByUserId() {
      const [response] = await getUserByUserId(user.uid);
      setActiveUser({ ...response });
    }
    if (user && user.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { user: activeUser };
}
