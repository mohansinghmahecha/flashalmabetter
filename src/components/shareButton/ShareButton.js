import React, { useEffect, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";

import "../full-detailPage/box.css";

/* this links shows when share button clicked  */
const linkofAB = "http://www.almabetter.com/mohan-singh";

export const ShareButton = ({ clickedorNot, closeShareComponent }) => {
  const [isCopied, setIsCopied] = useState(false);
  const currentUrlProject = window.location.href; // Current URL

  useEffect(() => {
    if (isCopied) {
      var dcopied = setTimeout(() => {
        setIsCopied(false);
        console.log("called");
      }, 2000);
    }

    return () => clearTimeout(dcopied);
  }, [isCopied, clickedorNot]);

  function shareLinkin() {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      currentUrlProject
    )}`;
    window.open(url, "_blank");
  }

  /* share button */
  const shareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      987654321
    )}`;
    window.open(url, "_blank");
  };

  function handleCopyButton() {
    navigator.clipboard.writeText(linkofAB);
    setIsCopied(true);
  }
  /* when facebook item clicked */
  function facbookClicked() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrlProject
    )}`;
    window.open(url, "_blank");
  }

  /* when clicked on mail  */
  const shareToEmail = () => {
    const subject = "Check this out!";
    const body = `I found this interesting: ${currentUrlProject}`;
    const url = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      {clickedorNot && (
        <div className="box-setting  p-4">
          <div className="flex justify-between p-1 m-2 gap-4 ">
            <p className="text-lg font-bold">Share</p>
            {/* cross icon to close the sharecomponent box */}
            <RxCrossCircled
              className="hover:cursor-pointer hover:scale-105 animate-bounce"
              style={{ width: "50px", height: "45px" }}
              onClick={() => closeShareComponent(false)} // Update this line to hide ShareButton
            />
          </div>

          <div className="flex justify-center items-center h-auto p-1">
            <p className="border border-dashed border-2 rounded-lg">
              <span className="ml-1 text-orange-500">Link</span>
              <span className="ml-3 mr-3">{linkofAB}</span>
            </p>
            {/* copy button  */}
            <FaRegCopy
              className="m-1 hover:cursor-pointer"
              onClick={handleCopyButton}
            />
            {/* small share button any here is my linkedin id */}
            <FaShareAlt
              className="m-5 hover:cursor-pointer"
              onClick={() =>
                window.open("https://www.linkedin.com/in/mohan-singh-mahecha/")
              }
            />
          </div>
          {isCopied && (
            <div className="w-full absolute top-20 z-52 left-50">
              <p className="text-center text-red-800">
                {" "}
                Text copied Succesfully !!
              </p>
            </div>
          )}
          <div className="flex justify-between p-3">
            <FaLinkedin
              className="box-svg-size hover:cursor-pointer text-blue-900"
              onClick={shareLinkin}
            />
            <IoLogoWhatsapp
              className="box-svg-size hover:cursor-pointer text-green-400"
              onClick={shareWhatsApp}
            />
            <FaFacebook
              className="box-svg-size hover:cursor-pointer text-blue-400 "
              onClick={facbookClicked}
            />
            <MdOutlineMail
              className="box-svg-size hover:cursor-pointer "
              onClick={shareToEmail}
            />
          </div>
        </div>
      )}
    </div>
  );
};
