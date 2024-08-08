import React, { useState } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { createGroup } from "../../redux/action/index.js";
import { v4 as uuidv4 } from "uuid";
import "../full-detailPage/box.css"; //css file

export default function CustomBox({
  propValueName,
  propValueDiscription,
  propImage,
  onSubmit,
}) {
  const [boxes, setBoxes] = useState([
    {
      subGroupName: "",
      subGroupDiscription: "",
      subGroupImage: null,
      imagePreview: "",
    },
  ]);

  const uniqueId = uuidv4(); // it generates unique id
  const dispatch = useDispatch();

  /* submit button is called here */
  const submitButton = () => {
    const groupItemSave = boxes.map((box, index) => ({
      subGroupName: box.subGroupName,
      subGroupDiscription: box.subGroupDiscription,
      subGroupId: index + 1,
      subGroupImage: box.subGroupImage,
    }));

    dispatch(
      createGroup({
        itemId: uniqueId,
        groupName: propValueName,
        groupDiscription: propValueDiscription,
        groupImage: propImage,
        groupItems: groupItemSave,
      })
    );

    // Reset local submission
    setBoxes([
      {
        subGroupName: "",
        subGroupDiscription: "",
        subGroupImage: null,
        imagePreview: "",
      },
    ]);
    onSubmit();
  };

  /* when add more button clicked  */
  const handleCustomBox = () => {
    setBoxes((prevBoxes) => [
      ...prevBoxes,
      {
        subGroupName: "",
        subGroupDiscription: "",
        subGroupImage: null,
        imagePreview: "",
      },
    ]);
  };

  /* it handles image uploading */
  const handleImageChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBoxes((prevBoxes) => {
        const updatedBoxes = [...prevBoxes];
        updatedBoxes[index].subGroupImage = file;
        updatedBoxes[index].imagePreview = reader.result; // Set image preview
        return updatedBoxes;
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  /* when delete icon clicked  */
  const handleDelete = (index) => {
    setBoxes((prevBoxes) => prevBoxes.filter((_, i) => i !== index));
  };

  return (
    <div className="grid grid-rows-2 overflow-scroll ">
      <div className="h-52 overflow-auto">
        {/* box for the row  */}
        <div className="p-2  ">
          {boxes.map((box, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 items-center  border-2 rounded p-2 lg:border-0"
            >
              <div className="flex justify-center md:block">
                {/* counting for the box-item */}
                <span className="p-2 border border-red-800 rounded-b-full bg-red-700">
                  {index + 1}
                </span>
              </div>

              {/* Subgroup Name - Enter Term input box */}
              <div className="w-full">
                <label className="block" htmlFor={`subGroupName-${index}`}>
                  Enter Term*
                </label>
                <input
                  id={`subGroupName-${index}`}
                  placeholder="Enter Name"
                  className="w-full md:w-1/2"
                  value={box.subGroupName}
                  onChange={(e) =>
                    setBoxes((prevBoxes) => {
                      const updatedBoxes = [...prevBoxes];
                      updatedBoxes[index].subGroupName = e.target.value;
                      return updatedBoxes;
                    })
                  }
                />
              </div>

              {/* Subgroup Description we can say it defination in the term of our project  */}
              <div className="w-full">
                <label
                  className="block"
                  htmlFor={`subGroupDiscription-${index}`}
                >
                  Enter Definition*
                </label>
                <input
                  id={`subGroupDiscription-${index}`}
                  placeholder="Description"
                  className="w-full md:w-1/2"
                  value={box.subGroupDiscription}
                  onChange={(e) => {
                    setBoxes((prevBoxes) => {
                      const updatedBoxes = [...prevBoxes];
                      updatedBoxes[index].subGroupDiscription = e.target.value;
                      return updatedBoxes;
                    });
                  }}
                />
              </div>

              {/* Image Upload and preview it .  */}
              <div className="w-full flex justify-center md:block">
                {box.imagePreview ? (
                  <img
                    src={box.imagePreview}
                    alt="Preview-image"
                    className="mt-2 w-16 h-16 object-cover"
                  />
                ) : (
                  <label
                    style={{ marginTop: "50px" }}
                    htmlFor={`selectimg-${index}`}
                    className="inline w-auto h-auto rounded-lg border border-black p-1 cursor-pointer"
                  >
                    <FaPlus className="w-auto inline" />
                    <span className="ml-1">Image</span>
                    <input
                      type="file"
                      id={`selectimg-${index}`}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageChange(index, e.target.files[0])
                      }
                    />
                  </label>
                )}
              </div>
              <div className="flex justify-center md:block">
                {/* trash icon to delete a row */}
                <IoTrashBinSharp
                  className="hover:cursor-pointer  p-0  "
                  onClick={() => handleDelete(index)}
                />{" "}
                {/* when pressed here it reflect for the edit  */}
                <label htmlFor={`subGroupName-${index}`}>
                  <FaEdit className=" hover:cursor-pointer p-0 sm:mt-0 md:mt-0 lg:mt-2" />
                </label>
              </div>
            </div>
          ))}

          {/* want to create on New Row and add more items  */}
          <button className="mt-4" onClick={handleCustomBox}>
            <FaPlus className="inline" /> Add More
          </button>
        </div>
      </div>

      <div className="flex bg-white justify-center items-start w-[95%] h-[20px] p-1 ">
        {/* click button to submit button  */}
        <button
          className="border block border-black rounded-lg p-1 mt-6  w-40 text-white bg-red-900 margin-bt"
          onClick={submitButton}
        >
          Submit
        </button>
      </div>
    </div>
  );
}