import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { NextSeo } from "next-seo";
import React, { useState } from 'react';
import Header from "../pages/components/Header";
import Main from "../pages/components/Main";
import Footer from "../pages/components/Footer";
import Head from "next/head";
// import MapBox from './components/map';
import Model from './components/Test';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      // className={`flex min-h-screen flex-col items-center justify-between  ${inter.className}`}
      className={`  ${inter.className}`}
    >
        


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
        <title>VRjetty</title>
        <link rel="icon" href="/img/favicon-VRjetty.png" />
      </Head>
      <Header />
      <Main />
      <Model />
      <Footer />
    </div>



{/* <div>
  <h1>Welcome to Your Landing Page</h1>
  <p>This is your landing page content.</p>
  <Link href="/app">
    Go to App
  </Link>
</div> */}

    </main>
  )
}
