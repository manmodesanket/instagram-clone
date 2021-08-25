import Head from "next/head";
import "firebase/firestore";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Home Instagram</title>
      </Head>
      <div>
        <Link href="/login" className="font-bold">
          <span className="border-b-2 border-blue-400">Login</span>
        </Link>
      </div>
    </div>
  );
}
