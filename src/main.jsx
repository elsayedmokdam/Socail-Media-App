import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router";
import { myRouter } from "./Routes/AppRouting";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import { AudioPlayerProvider } from "react-use-audio-player";
import { Bounce, ToastContainer } from "react-toastify";
import AuthTokenProvider from "./Context/AuthTokenProvider/AuthTokenProvider";

// Entry point of my app (root element)

{
  /* <HeroUIProvider> is a context provider from @heroui/react library */
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthTokenProvider>
      <HeroUIProvider>
        <AudioPlayerProvider>
          <RouterProvider router={myRouter} />
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </AudioPlayerProvider>
      </HeroUIProvider>
    </AuthTokenProvider>
  </StrictMode>,
);
