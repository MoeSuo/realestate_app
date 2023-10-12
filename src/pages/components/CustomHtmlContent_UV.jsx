import React from "react";
import { Html } from "@react-three/drei";
import { toast } from "react-toastify";

import { HiCube } from "react-icons/hi";

function CustomHtmlContent_UV({  }) {
  return (
    <Html position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]}>
  <div
    className={`flex justify-between text-white w-max p-2 font-light cursor-pointer bg-black bg-opacity-40`}
    onClick={() => {
      window.open("https://www.google.com", "_blank");
    }}
  >
    <div className="flex justify-between mx-1 items-center">View</div>
    
    <div className="flex justify-between mx-1 items-center"> <HiCube /></div>
   
  </div>
</Html>

  );
}

export default CustomHtmlContent_UV;
