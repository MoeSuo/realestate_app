import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/img/favicon-VRjetty.PNG";
// we should use the data from the mongodb as provided in the api (plants)
import { links } from "../../../data/info"; // i corrected the path here

import { useState } from "react";
import { usePathname } from "next/navigation";
import UserMenu from "../userMenu/userMenu";
import { signOut, useSession } from "next-auth/react";

export default function Navbar({ onSignOut }) {
  const [isOpen, setIsOpen] = useState(false); //to hide menu
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session } = useSession();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to share the current URL via email
  const shareViaEmail = () => {
    const currentURL = window.location.href;
    const emailSubject = "Check out this link!";
    const emailBody = `I wanted to share this link with you: ${currentURL}`;
    const emailLink = `mailto:?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = emailLink;
  };

  // Function to copy the current URL to the clipboard
  const copyToClipboard = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      alert("URL copied to clipboard");
    });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="fixed top-0 right-0 left-0  bg-white z-50">
      <div className="relative flex justify-between p-4 items-center flex-wrap container mx-auto ">
        <div className=" w-150px h-69px">
          <Link href="/">
            <Image src={logo} alt="logo" width={35} height={35} />
          </Link>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500  lg:hidden hover:bg-gray-100 "
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={"w-full lg:block lg:w-auto  " + (!isOpen ? "hidden" : "")}
        >
          <div className="flex flex-col p-0 mt-4 lg:flex-row lg:space-x-8 lg:mt-0 lg:bg-white ">
            {/* //share dropdown menu // */}
            <div className="relative inline-block text-left">
              <button
                onClick={toggleDropdown}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Share
              </button>
              {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="py-1">
                    <button
                      onClick={shareViaEmail}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200 w-full text-left"
                    >
                      Share via Email
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200 w-full text-left"
                    >
                      Copy to Clipboard
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* //share dropdown menu // */}

            {links.map((link, i) => (
              <Link
                href={link.url}
                key={i}
                onClick={() => {
                  // if (link.title === "Share it") {
                  //   // Call the onSignOut function passed as a prop
                  //   if (typeof onSignOut === "function") {
                  //     onSignOut();
                  //   }
                  //   // Optionally, call the signOut function from NextAuth.js here
                  //   // if you need to perform additional sign-out logic
                  //   // signOut();
                  // }
                }}
                className={
                  "py-2 pl-3 pr-4 hover:underline hover:underline-offset-4" +
                  (link.url === pathname ? " underline underline-offset-4" : "")
                }
              >
                {link.title.toUpperCase()}
              </Link>
            ))}

            <Link href="/user/profile"></Link>
            <button className="" onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </button>
            {userMenuOpen ? (
              <UserMenu
                user={session?.user}
                signOut={() =>
                  signOut({ callbackUrl: "http://localhost:3000/" })
                }
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
