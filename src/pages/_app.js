import '@/styles/globals.css'

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// import { Apart001 } from "./UserApart001";
// import { UserViewer } from "./user-viewer";
// import CustomControlsGroup from './components/CustomControlsGroup';
// import Model from './Building';

function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  
  return (<>
          <ToastContainer />
    <Component {...pageProps} />

    </>
    );
  }
  
  export default  App
  