import React, { useState, useRef, useContext, useEffect } from "react";
import { LuUpload, LuTrash, LuUser } from "react-icons/lu";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";

export default function ProfileSelector({ image, setImage, setUploading }) {
  const { user } = useContext(UserContext);
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (image instanceof File) {
      const preview = URL.createObjectURL(image);
      setPreviewUrl(preview);
      return () => URL.revokeObjectURL(preview);
    }

    if (typeof image === "string" && image.trim() !== "") {
      setPreviewUrl(image);
    } else if (user?.profileImageUrl && image !== null) {
      setPreviewUrl(user.profileImageUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [image, user]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      const formData = new FormData();
      formData.append("image", file);
      try {
        setUploading?.(true);
        const res = await axiosInstance.post("/api/upload-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setImage(res.data.imageUrl);
      } catch (err) {
        console.error("Image upload failed:", err);
      } finally {
        setUploading?.(false);
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
        key={image} // resets file input
        aria-label="Upload profile photo"
      />

      {!previewUrl ? (
        <div className="w-20 h-20 flex items-center justify-center bg-blue-100/50 rounded-full relative">
          <LuUser className="text-3xl text-gray-500" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"
            onClick={onChooseFile}
            title="Upload"
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile"
            title={image instanceof File ? image.name : "Profile Photo"}
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
            onClick={handleRemoveImage}
            title="Remove"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
}
