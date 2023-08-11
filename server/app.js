import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import env, { config } from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import messageRoutes from "./routes/messageRoute.js";
import userRoutes from "./routes/userRoute.js";
import uploadPicRoute from "./routes/uploadPicRoute.js";
import cookieParser from "cookie-parser";

/* App Configuration */
const PORT = process.env.PORT || 8000;
env.config();
const app = express();

/* Middlewares */
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(express.json());
app.use(cookieParser());

//TO serve images for public
app.use(express.static("public"));
app.use("/images", express.static("images"));

/* Mongoose Connection */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected Succussfully!");
  })
  .catch((err) => {
    console.log(err.message);
  });

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/uploadPic", uploadPicRoute);

/* Listening The Server */
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("New Connection")
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.reciever);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data);
    }
  });
});
