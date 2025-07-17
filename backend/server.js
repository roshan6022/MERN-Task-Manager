import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("✅ Backend is alive");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});

// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import connectDB from "./config/db.js"; //add .js extenstion
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";
// import reportRoutes from "./routes/reportRoutes.js";
// import uploadImageRoutes from "./routes/uploadImage.js";

// dotenv.config();

// const app = express();

// console.log("🧠 Starting server with ENV:", {
//   PORT: process.env.PORT,
//   CLIENT_URL: process.env.CLIENT_URL,
//   MONGO_URI: process.env.MONGO_URL?.slice(0, 20) + "...", // mask it
// });

// // Middleware to handle CORS
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// // Handle OPTIONS preflight for all routes
// app.options("*", (req, res) => {
//   res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.sendStatus(200);
// });

// // Connect to Database
// connectDB();

// // Middleware
// app.use(express.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// // Routes
// // app.use("/api/auth", authRoutes);
// // app.use("/api/users", userRoutes);
// // app.use("/api/tasks", taskRoutes);
// // app.use("/api/reports", reportRoutes);
// // app.use("/api", uploadImageRoutes);

// // Start Server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server listening to port ${PORT}`);
// });
