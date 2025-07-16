import express from "express";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "profile-uploads" },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Upload failed"));
        }

        const transformedUrl = result.secure_url.replace(
          "/upload/",
          "/upload/w_200,h_200,c_fill,r_max/"
        );

        resolve(transformedUrl);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const transformedUrl = await uploadToCloudinary(req.file.buffer);

    res.status(200).json({ imageUrl: transformedUrl });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

export default router;
