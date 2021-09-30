import "tailwindcss/tailwind.css";
import { FirebaseProvider } from "../context/firebase";
import { injectStyle } from "react-toastify/dist/inject-style";
import "../../main.css";

if (typeof window !== "undefined") {
  injectStyle();
}

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <Component {...pageProps} />
    </FirebaseProvider>
  );
}

export default MyApp;
