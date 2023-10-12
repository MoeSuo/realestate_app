// LandingPage.js
import React from "react";
import Link from "next/link";
import { Html, useGLTF } from "@react-three/drei";

export default function LandingPage() {
  return (
    <Html>

    <div>
      <h1>Welcome to Your Landing Page</h1>
      <p>This is your landing page content.</p>
      <Link href="/app">
        Go to App
      </Link>
    </div>
    </Html>
  );
}
