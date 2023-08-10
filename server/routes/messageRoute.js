import express from "express";
import {
  clearChats,
  getMessages,
  sendMessage,
} from "../controllers/messageController.js";
import verifyToken from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, sendMessage);
router.get("/:id", verifyToken, getMessages);
router.delete("/:id", verifyToken, clearChats);

export default router;
