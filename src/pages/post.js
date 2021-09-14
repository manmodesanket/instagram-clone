import Head from "next/head";
import React, { useState } from "react";
import { useFirebase } from "../context/firebase";
import useUser from "../hooks/use-user";
import { Header, NavMobile } from "../component";
import { addPostToFireStore } from "../services/firebase";
import { FilePlus, Instagram } from "react-feather";

export default function Post() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [caption, setCaption] = useState("");
  const { storage, user, loading } = useFirebase();
  const { user: activeUser } = useUser();

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
      const imageRef = storageRef.child(`${username}/${selectedFile.name}`);
      await addPostToFireStore({
        imageSrc: `${username}/${selectedFile.name}`,
        caption,
        userId: user.uid,
      });
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
          <title>Instagram Post</title>
        </Head>
        <Header />
        <div className="flex flex-col w-full h-screen items-center justify-center bg-grey-lighter">
          <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue">
            <FilePlus />
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => changeHandler(e)}
              accept="image/x-png,image/jpeg"
            />
          </label>
          {isFilePicked ? (
            <div>
              <p>Filename: {selectedFile.name}</p>
              <img src={fileUrl} className="max-w-full mx-auto p-2" />
              <input
                type="text"
                name="caption"
                placeholder="Add caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="text-sm w-full mx-auto p-4 h-2 border rounded mb-2"
              />
            </div>
          ) : (
            <p className="pt-4">Select a file to show details</p>
          )}
          <div className="pt-4">
            <button
              className="bg-blue-500 font-bold text-sm rounded text-white w-20 h-8"
              onClick={handleSubmission}
            >
              Post
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
