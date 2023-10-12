

import React from "react";



import { NextSeo } from "next-seo";

import Head from "next/head";




export default function App() {




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
   
    </div>


    </>
  );
}
