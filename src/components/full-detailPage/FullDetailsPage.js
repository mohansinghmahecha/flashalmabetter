import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShare } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdPrint } from "react-icons/md";
import { ShareButton } from "../shareButton/ShareButton";

/* in this componet it will show the created flashcard in details  */
export default function FullDetailsPage() {
  const [shareButtonClicked, setShareButtonClicked] = useState(false);
  const { id } = useParams(); //from react-router-dom got id
  const nav = useNavigate();

  const fullDetailedData = useSelector((state) => state.groupCreating);
  // Find by id
  const groupData = fullDetailedData.find((group) => group.itemId === id);

  const shareButtonRef = useRef(null);
  // console.log(shareButtonRef);

  useEffect(() => {
    // Add event  outside clicks
    const handleClickOutside = (event) => {
      if (
        shareButtonRef.current &&
        !shareButtonRef.current.contains(event.target)
      ) {
        setShareButtonClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [groupData]);

  return (
    <div className="ml-20 mr-20 p-2   " ref={shareButtonRef}>
      <div className="flex">
        <div>
          {/* when back button press should navigate  */}
          <FaArrowLeftLong
            className="mt-2 hover:cursor-pointer"
            onClick={() => nav("/mycards")}
          />
        </div>
        <div className="">
          <span className="font-bold text-xl ml-2">{groupData?.groupName}</span>
          {/* main discription from redux using its id */}
          <p className="p-2">
            {groupData.groupDiscription || "No description available."}
          </p>
        </div>
      </div>
      {/* for grid  */}
      <div className="flex gap-20 w-full flex-wrap h-20 mt-5">
        {/* flashcard box */}
        <div className="basis-1/4 shrink-0 w-full p-2 bg-white shadow-sm rounded-lg ">
          FlashCard
          <hr></hr>
          {/* list of term name displed */}
          {groupData.groupItems?.map((item, i) => (
            <p key={item.id || i}>{item.subGroupName}</p> // Use unique key if available
          ))}
        </div>

        {/* largeDetail */}
        <div className="border grow flex p-2 bg-white shadow-md text-center justify-start">
          <div className="justify-start border border-blue-500">
            {/* main image in fullDetailsPage */}
            <img
              src={
                groupData.groupImage ||
                "https://flashcard-generator56.netlify.app/static/media/hands-tab.a01aa6a91a2a96378f7b.jpg"
              }
              width={280}
              height={80}
              alt="project-discription-img"
            />
          </div>

          {/* list of enterd  Definition displed */}
          <div className="p-4 flex flex-col items-center justify-center">
            {groupData.groupItems?.map((item, i) => (
              <p key={item.id || i} className="">
                {item.subGroupDiscription}
              </p>
            ))}
          </div>
        </div>

        <div className="basis-1/4 p-4 flex flex-col gap-2">
          <div>
            {/* big share button on righr side */}
            <button
              className="p-2 w-full flex bg-white shadow-md hover:scale-105"
              onClick={() => setShareButtonClicked(!shareButtonClicked)}
            >
              <FaShare className="ml-2" />
              <span className="ml-4">Share</span>
            </button>
          </div>

          <div onClick={()=>alert("Coming soon..")}>
            {/* download button  */}
            <button className="p-2 w-full flex bg-white shadow-md hover:scale-105">
              <MdOutlineFileDownload className="ml-2" />
              <span className="ml-4">Download</span>
            </button>
          </div>

          {/* print button is here */}
          <div className="" onClick={() => window.print()}>
            <button className="p-2 w-full flex bg-white shadow-md hover:scale-105">
              <MdPrint className="ml-2" />
              <span className="ml-4">Print</span>
            </button>
          </div>
        </div>
      </div>

      {shareButtonClicked && (
        /* when clied on share component it works like a dialogue box */
        <ShareButton
          clickedorNot={shareButtonClicked}
          closeShareComponent={setShareButtonClicked}
        />
      )}
    </div>
  );
}
