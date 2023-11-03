import Link from "next/link";
import React from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { links } from "../../data/info"; // i corrected the path here

import { WhatsappShareButton, WhatsappIcon } from "next-share";
import ShareButton from "./ShareButton";
import NavBar from "../components/nav";

export default function Header() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [flyer, setFlyer] = React.useState(false);
  const [flyerTwo, setFlyerTwo] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full  z-50 bg-[#05111A] bg-opacity-90 gradient-background_01">
      <div className="max-w-5xl mx-auto flex flex-wrap p-5 flex-col md:flex-row">
        <div className="flex flex-row items-center justify-between p-3 md:p-1">
          <img
            className=" w-[100px] h-[100px] mr-6"
            alt="Placeholder Image"
            src="../../../img/favicon-VRjetty.png"
          ></img>
          <Link
            href="/"
            className="flex text-3xl text-white font-medium mb-4 md:mb-0"
          >
            VRJETTY
          </Link>
          <button
            className="text-white pb-4 cursor-pointer leading-none px-3 py-1 md:hidden outline-none focus:outline-none content-end ml-auto"
            type="button"
            aria-label="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        <div
          className={
            "justify-between px-6 md:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
        >
          <div className="md:ml-auto md:mr-auto font-4 pt-1 md:pl-14 pl-1 flex flex-wrap items-center md:text-base text-1xl md:justify-center justify-items-start">
            <Link
              href="#feature"
              className="mr-11 pr-2 cursor-pointer text-gray-300 hover:text-white font-semibold tr04"
            >
              Features
            </Link>

            <Link
              href="/real-estate-sales-app.html"
              target="_blank"
              className="mr-5 cursor-pointer text-gray-300 hover:text-white font-semibold tr04"
            >
              Demo
            </Link>
          </div>

          <div className=" relative text-white   right-[0rem] ">

            {/* <WhatsappShareButton
              url={"https://realestate-app-xi.vercel.app/"}
              title={
                "THE FUTURE OF PROPERTY TRANSACTIONS."
              }
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton> */}


<div className="md:justify-center md:items-center md:flex ">


<NavBar />

</div>

          </div>
        </div>
      </div>
    </header>
  );
}
