import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import "firebase/auth";
import { useState } from "react";
import { useFirebase } from "../context/firebase";
import { Instagram } from "react-feather";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");
  const [error, setError] = useState("");

  const { firebase, user, loading } = useFirebase();
  const router = useRouter();

  function loginError() {
    return email === "" || password === "";
  }

  function login(email, password) {
    const auth = firebase.auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassoword("");
        setError("");
        router.push("/");
      })
      .catch((error) => {
        setEmail("");
        setPassoword("");
        setError(error.message);
      });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginError()) {
      setError("Please enter all the fields");
    } else {
      login(email, password);
    }
  };

  if (loading) {
    return (
      <main className="w-full bg-gray-200 h-screen">
        <Head>
          <link rel="icon" type="image/png" href="/instagram.png" />
          <title>Login Instagram</title>
        </Head>
        <div className="flex items-center justify-center h-screen">
          <Instagram />
        </div>
      </main>
    );
  } else if (user != null || user != undefined) {
    router.push("/");
    return null;
  }

  return (
    <div className="container w-full mx-auto flex max-w-screen-md items-center h-screen">
      <Head>
        <title>Login Instagram</title>
        <link rel="icon" type="image/png" href="/instagram.png" />
      </Head>
      <div className="hidden sm:block bg-white w-3/5">
        <img src="/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
      </div>
      <div className="flex flex-col mx-auto sm:w-2/5 w-11/12 text-center border p-4">
        <img
          src="/logo.png"
          alt="Instagram"
          className="mt-2 mx-auto w-6/12 mb-4"
        />
        {error && (
          <div className="text-xs text-red-400 mx-auto mb-2">{error}</div>
        )}
        <form className="flex flex-col" onSubmit={(e) => handleLogin(e)}>
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
              setPassoword(e.target.value);
            }}
            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white w-full rounded h-8 font-bold"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => {
            setEmail("guest@gmail.com");
            setPassoword("guest123");
            login("guest@gmail.com", "guest123");
          }}
          className="bg-blue-500 text-white w-full rounded h-8 mt-2 font-bold"
        >
          Guest Login
        </button>
        <div className="flex justify-center items-center flex-col w-full bg-white p-2 border mt-4 cursor-pointer">
          <p className="text-sm">
            Don't have an account?
            <Link href="/signup" className="font-bold">
              <span className="border-b-2 border-blue-400"> Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
