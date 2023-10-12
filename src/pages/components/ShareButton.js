import React, { useEffect } from "react";

const ShareButton = () => {
  useEffect(() => {
    // Load AddToAny script when the component mounts
    const script = document.createElement("script");
    script.src = "https://static.addtoany.com/menu/page.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="share-button">
      <a
        className="a2a_dd"
        href="https://www.addtoany.com/share"
        aria-label="Share"
      >
        <i className="fa-solid fa-share-from-square"></i> Share
      </a>
    </div>
  );
};

export default ShareButton;
