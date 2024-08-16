import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import AWS, { S3 } from "aws-sdk";

// const cloudinaryAPI = process.env.REACT_APP_CLOUDINARY_API;
// const cloudinaryAPI = "https://s3.eu-west-1.wasabisys.com/chatapp/avatar";
// const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESENT;
// const uploadPreset = "upload_preset";

export default function UploadImage({ handelFileUpload }) {
  const END_POINT = "http://localhost:5000";
  //   const accessKeyId = "BVMCH6HC9PVRWXC9H2KG";
  //   const secretAccessKey = "rahVBU5creMu5f9w6KGhoHz7O2Bs3Dc8aGdywqy3";
  //   const wasabiEndPoint = new AWS.Endpoint("s3.eu-west-1.wasabisys.com");

  //   const s3 = new S3({
  //     endpoint: wasabiEndPoint,
  //     region: "eu-west-1",
  //     accessKeyId,
  //     secretAccessKey,
  //   });
  // handel file upload

  const jwtToken = () => {
    const userData = JSON.parse(
      localStorage.getItem("chat-app-login-user-data")
    );
    return "Bearer " + String(userData.token);
  };
  const handleImageUpload = async (e) => {
    const uploadedImage = e.target.files[0];
    toast.warn("Uploading image.", { position: toast.POSITION.BOTTOM_LEFT });

    if (uploadedImage) {
      if (uploadedImage.size > 5242880) {
        toast.error("Image size should be less than 5MB.", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        return;
      }

      //   const params = {
      //     Bucket: "chatapp",
      //     Key: `avatar/${uploadedImage.name}`, // Use a dynamic name
      //     Body: uploadedImage,
      //     ContentType: uploadedImage.type, // Set the content type
      //   };
      const formData = new FormData();
      formData.append("avatar", uploadedImage);

      try {
        // await s3.putObject(params).promise(); // Use .promise() to handle the response
        // const imageUrl = `https://s3.eu-west-1.wasabisys.com/chatapp/avatar/${uploadedImage.name}`; // Construct the URL
        const res = await axios.post(
          `${END_POINT}/api/user/uploadAvatar`,
          formData,
          {
            headers: {
              Authorization: jwtToken(),
            },
          }
        );
        const imagePath = res.data.path;
        handelFileUpload(`${END_POINT}/${imagePath}`); // Pass the URL to the parent component
        toast.success("Image uploaded successfully!", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Image upload failed. Please try again.", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    } else {
      toast.error("Please select an image file.", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  return (
    <div
      div
      className="cursor-pointer w-full py-2 px-4 text-sm font-bold hover:bg-primary-800 hover:text-primary-50"
    >
      <label htmlFor="imageUpload" className="py-2 px-5 cursor-pointer">
        Change Picture
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </label>

      <ToastContainer />
    </div>
  );
}
