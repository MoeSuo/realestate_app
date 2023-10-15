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
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
        {/* <Google tag (gtag.js) />  */}
        <div className="container">
        <Script id="google-analytics">
          {`

<script async src="https://www.googletagmanager.com/gtag/js?id=G-R8G9DJR4Y4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-R8G9DJR4Y4');
</script>
`}
        </Script>
      </div>


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



        {/* <Sendinblue />  */}
<Script >
{`
        (function(d, w, c) {
        w.BrevoConversationsID = '652b6be1a819886ce04f8aea';
        w[c] = w[c] || function() {
            (w[c].q = w[c].q || []).push(arguments);
        };
        var s = d.createElement('script');
        s.async = true;
        s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
        if (d.head) d.head.appendChild(s);
    })(document, window, 'BrevoConversations');
    `}
    </Script>

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
    </>
  )
}
