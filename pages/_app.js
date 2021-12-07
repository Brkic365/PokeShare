import React from "react";
import "../styles/globals.css";

import { Provider } from "react-redux";
import { useStore } from "../redux/store";

import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
