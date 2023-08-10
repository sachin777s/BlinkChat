import express from "express";
import {
  addContact,
  deleteContact,
  deleteUser,
  getAllContacts,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import verifyToken from "../verifyToken.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.put("/contact/:id", verifyToken, addContact);
router.get("/contact/:id", verifyToken, getAllContacts);
router.delete("/contact/:id", verifyToken, deleteContact);

export default router;
