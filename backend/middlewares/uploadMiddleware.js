// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import streamifier from "streamifier";

// // config your cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = multer.memoryStorage(); // 🧠 switch to memory!
// const upload = multer({ storage });

// export const uploadToCloudinary = (buffer) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream((error, result) => {
//       if (result) resolve(result);
//       else reject(error);
//     });

//     streamifier.createReadStream(buffer).pipe(stream);
//   });
// };

// export default upload;
