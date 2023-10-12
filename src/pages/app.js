

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { ToastContainer } from "react-toastify";
import { useSession, signOut, signIn } from "next-auth/react";

import { getSession } from "next-auth/react";

import { NextSeo } from "next-seo";
import Header from "../pages/components/Header";
import Main from "../pages/components/Main";
import Footer from "../pages/components/Footer";
import Head from "next/head";


import "react-toastify/dist/ReactToastify.css";

// import { Apart001 } from "./UserApart001";
// import Model from './Building';
import Navbar from "./components/navbar/navBar";
import Model from "./components/Test";
// import UserViewer from "./user-viewer";

export default function App() {

    const { data: session } = useSession(); // Retrieve the user session

  const [showModel, setShowModel] = useState(!!session);
  
  const handleSignOut = async () => {
    // Sign the user out using the signOut function from NextAuth.js
    await signOut();

    // Update showModel state to false after signing out
    setShowModel(false);
  };
  // Use useEffect to ensure session is fetched on the client side
  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      setShowModel(!!session);
    }

    fetchSession();
  }, []); // Empty dependency array means this effect runs once, like componentDidMount




  return (
    <>
     <div className="text-black bg-black">
      <NextSeo
        title="Home: VRjetty"
        description="Welcome to VRjetty homepage."
        // canonical="https://nine4-3.vercel.app/"
        openGraph={{
          // url: "https://nine4-3.vercel.app/",
        }}
      />
      <Head>
        <title>VRjetty-APP</title>
        <link rel="icon" href="/img/favicon-VRjetty.png" />
      </Head>
      {/* <Header /> */}
      {/* <Main /> */}
      {/* <Footer /> */}
    </div>


     <Navbar onSignOut={handleSignOut}  />
      <Canvas shadows camera={{ position: [200, 140, 180], near: 0.01,
    far: 10000000, }} >
      <directionalLight castShadow position={[180, 100, 15]} shadow-mapSize={[4069, 4069]}></directionalLight>
        <Environment preset="park" />
        {/* {showModel ? <Model /> : <UserViewer />} */}
        
        <ContactShadows position={[0, -0.8, 0]} color="#000000" />
        <OrbitControls />
        <CustomControlsGroup apartmentId={"64f316c3e2c0ebaecf4cbc1c"} />
      </Canvas>
      <ToastContainer />
    </>
  );
}
