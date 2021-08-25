import Head from "next/head";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { doesUsernameExist } from "../services/firebase";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { firebase } = useFirebase();
  const router = useRouter();

  function signUpError() {
    return (
      username === "" || fullName === "" || email === "" || password === ""
    );
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (signUpError()) {
      setError("Please enter all the fields");
    } else {
      try {
        const usernameExists = await doesUsernameExist(username);
        if (!usernameExists.length) {
          const auth = firebase.auth();
          const createdUserResult = await auth.createUserWithEmailAndPassword(
            email,
            password
          );

          await createdUserResult.user.updateProfile({
            displayName: username,
          });
          await firebase.firestore().collection("users").add({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            emailAddress: email.toLowerCase(),
            following: [],
            followers: [],
            dateCreated: Date.now(),
          });
          setUsername("");
          setFullName("");
          setEmail("");
          setPassword("");
          setError("");
          router.push("/");
        } else {
          setError("That username is already taken, please try another!");
        }
      } catch (error) {
        setUsername("");
        setFullName("");
        setEmail("");
        setPassword("");
        setError(error.message);
      }
    }
  };

  return (
    <div className="container w-full mx-auto flex max-w-screen-md items-center h-screen">
      <Head>
        <title>Signup Instagram</title>
      </Head>
      <div className="flex flex-col sm:w-3/6 w-11/12 mx-auto border p-4">
        <img
          src="/logo.png"
          alt="Instagram"
          className="mt-2 mx-auto w-6/12 mb-4"
        />
        {error && (
          <div className="text-xs text-red-400 text-center mb-2">{error}</div>
        )}
        <form className="flex flex-col" onSubmit={(e) => handleSignUp(e)}>
          <input
            aria-label="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
            type="text"
            placeholder="Username"
          />
          <input
            aria-label="Enter your fullname"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
            type="text"
            placeholder="Full Name"
          />
          <input
            aria-label="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
            type="text"
            placeholder="Email address"
          />
          <input
            aria-label="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white w-full rounded h-8 font-bold"
          >
            Signup
          </button>
        </form>
        <div className="flex justify-center items-center flex-col w-full bg-white p-2 border mt-4 cursor-pointer">
          <p className="text-sm">
            Already have an account?
            <Link href="/login" className="font-bold">
              <span className="border-b-2 border-blue-400">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
