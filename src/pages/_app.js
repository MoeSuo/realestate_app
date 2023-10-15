import '@/styles/globals.css'

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { ToastContainer } from "react-toastify";
import Script from "next/script"

import Sendinblue from "./sendinblue";

import "react-toastify/dist/ReactToastify.css";

// import { Apart001 } from "./UserApart001";
// import { UserViewer } from "./user-viewer";
// import CustomControlsGroup from './components/CustomControlsGroup';
// import Model from './Building';

function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  
  return (<>

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

          <ToastContainer />
    <Component {...pageProps} />

    </>
    );
  }
  
  export default  App
  