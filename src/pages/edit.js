import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Header, NavMobile } from "../component";
import useUser from "../hooks/use-user";
import { FilePlus, Instagram } from "react-feather";
import { useFirebase } from "../context/firebase";

export default function Edit() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const { user: activeUser } = useUser();
  const { storage, loading } = useFirebase();
  const router = useRouter();

  useEffect(async () => {
    const storageRef = storage.ref();
    if (activeUser != null || activeUser != undefined) {
      try {
        const url = await storageRef
          .child(`profile-pictures/${activeUser.username}.jpg`)
          .getDownloadURL();
        setFileUrl(url);
      } catch (e) {
        const url = await storageRef
          .child(`profile-pictures/default.jpg`)
          .getDownloadURL();
        setFileUrl(url);
      }
    }
  }, [activeUser]);

  const changeHandler = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSelectedFile(file);
          setIsFilePicked(true);
          setFileUrl(URL.createObjectURL(e.target.files[0]));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setSelectedFile(null);
      setIsFilePicked(false);
    }
  };

  const handleSubmission = async () => {
    if (selectedFile) {
      const { username } = activeUser;
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`profile-pictures/${username}.jpg`);
      imageRef.put(selectedFile).then(() => {
        alert("Image uploaded successfully to Firebase.");
      });
    }
  };

  if (loading) {
    return (
      <main className="w-full bg-gray-200 h-screen">
        <Head>
          <title>Instagram</title>
          <link rel="icon" type="image/png" href="/instagram.png" />
        </Head>
        <div className="flex items-center justify-center h-screen">
          <Instagram />
        </div>
      </main>
    );
  } else if (activeUser != null || activeUser != undefined) {
    return (
      <div>
        <Head>
          <title>Edit Profile</title>
          <link rel="icon" type="image/png" href="/instagram.png" />
        </Head>
        <Header />
        <div className="flex flex-col w-full h-screen items-center bg-grey-lighter">
          <h1 className="text-xl my-2">Edit Details</h1>
          {isFilePicked || fileUrl ? (
            <div className="flex items-center">
              <img src={fileUrl} className="rounded-full h-20 w-20 flex" />
              <label className="flex flex-col justify-center items-center cursor-pointer hover:bg-blue border ml-4 p-2">
                <FilePlus />
                <span className="mt-2 text-base leading-normal">
                  Change Profile Picture
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => changeHandler(e)}
                  accept="image/x-png,image/jpeg"
                />
              </label>
            </div>
          ) : (
            <p className="pt-4">Select a file to show details</p>
          )}
          <div className="pt-4">
            <button
              className="bg-blue-500 font-bold text-sm rounded text-white w-40 h-10"
              onClick={handleSubmission}
            >
              Update Profile Picture
            </button>
          </div>
        </div>
        <NavMobile />
      </div>
    );
  } else if (!loading && user == null) {
    router.push("/login");
    return null;
  }
}
