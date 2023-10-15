

import React from "react";



import { NextSeo } from "next-seo";

import Head from "next/head";




export default function App() {




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
