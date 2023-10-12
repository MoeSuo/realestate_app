import React from "react";
import { Html } from "@react-three/drei";
import { toast } from "react-toastify";

import { HiCube } from "react-icons/hi";

function CustomHtmlContent({ isHidden, toggleControls, toggleHidden, note }) {
  return (
    <Html position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]}>
      <div
        className={`xxx text-white w-max p-2 font-light cursor-pointer bg-black bg-opacity-40 ${
          isHidden ? "hidden" : ""
        }`}
        onClick={() => {
          toggleControls();
          toggleHidden();
          toast.dismiss();
        }}
      >
        <div className="flex justify-between"></div>
        <HiCube />
      </div>
    </Html>
  );
}

export default CustomHtmlContent;
