import "@/styles/globals.css";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <>
    <NextTopLoader
        color="#2a3890"
        showSpinner={false}
        zIndex={999}
        height={4}
      />
      <ToastContainer hideProgressBar={true} />

      <Component {...pageProps} />
    </>
  );
}
