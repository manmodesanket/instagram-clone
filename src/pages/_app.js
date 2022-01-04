import "tailwindcss/tailwind.css";
import { FirebaseProvider } from "../context/firebase";
import { injectStyle } from "react-toastify/dist/inject-style";
import "../../main.css";
import { ToastContainer } from "react-toastify";

if (typeof window !== "undefined") {
  injectStyle();
}

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </FirebaseProvider>
  );
}

export default MyApp;
