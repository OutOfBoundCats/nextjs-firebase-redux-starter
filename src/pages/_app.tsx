import React, { useEffect } from "react";
import App from "next/app";
import { useStore, Provider, useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import { createWrapper } from "next-redux-wrapper";
import { toast, ToastContainer } from "react-toastify";
import "@styles/globals.scss";
import AuthComponent from "@components/authComponent";

function MyApp({ Component, pageProps }) {
  const store = useStore();

  console.log(store);
  const p = persistStore(store);
  return (
    <PersistGate persistor={p} loading={<div>Loading</div>}>
      <AuthComponent>
        <Component {...pageProps} />
      </AuthComponent>

      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnFocusLoss
        closeOnClick
        pauseOnHover
      ></ToastContainer>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
