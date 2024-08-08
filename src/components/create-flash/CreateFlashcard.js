import React, { useState } from "react";
import "../create-flash/create.css";
import { FaUpload } from "react-icons/fa";
import CustomBox from "../custom-box/CustomBox";

export default function CreateFlashcard() {
  const [describe, setDescription] = useState("");
  const [valueName, setValueName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  // Function to reset input default values
  const resetInputs = () => {
    setValueName("");
    setDescription("");
    setImageUrl(null);
  };

  const handleButton = (e) => {
    setValueName(e.target.value);
  };

  const handleButtonDescription = (e) => {
    setDescription(e.target.value);
  };

  /* function for the uploading image  */
  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      // file is extists and must be matched
      const reader = new FileReader();
      reader.onload = (event) => setImageUrl(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="ml-10 mr-10  overflow-auto">
      {/* here create group and main discription  */}
      <div
        className="h-2/4 shadow-md rounded-lg"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div>
          {/* form is added here */}
          <form className="block p-4">
            <h1>Create Group *</h1>
            <input
              required
              name="name"
              type="text"
              className="mt-1 form-border w-4/12 h-9 rounded-lg inline "
              value={valueName}
              onChange={handleButton}
            />
            {/* input for the image , if image uploaded then show the image preview */}
            {imageUrl ? null : (
              <label
                required
                htmlFor="imageUpload"
                className="ml-4 inline w-auto h-auto rounded-lg border border-black p-2 cursor-pointer"
              >
                <FaUpload className="w-auto inline" />
                <span className="ml-2">Upload Image</span>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={uploadFile}
                />
              </label>
            )}
            {/* image preview */}
            {imageUrl && (
              <img
                src={imageUrl}
                className="ml-8 w-14 h-auto rounded-full inline"
                alt="Uploaded preview"
              />
            )}
          </form>

          <form className="block p-4">
            <h1>Add Description</h1>
            <textarea
              name="groupdescription"
              rows="3"
              className="mt-1 form-border w-4/6 h-[100px] rounded-lg"
              placeholder="Describe the roles, responsibilities, skills required for the job."
              value={describe}
              onChange={handleButtonDescription}
            />
          </form>
        </div>
      </div>

      <div
        className="mt-4 h-2/4 shadow-md rounded-lg"
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* custombox is for the box where mutiple 
        1. enter team
        2. enter defination
        3. Image
        */}
        <CustomBox
          propValueName={valueName}
          propValueDiscription={describe}
          propImage={imageUrl}
          onSubmit={resetInputs} // Pass reset function
        />
      </div>
    </div>
  );
}
