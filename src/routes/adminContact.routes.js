import express from "express";
import { adminProtect } from "../middleware/adminAuth.middleware.js";
import {
  getAllContacts,
  replyToContact,
  deleteContact,
} from "../controllers/contact.controller.js";



const router = express.Router();

router.get("/contacts", adminProtect, getAllContacts);
router.post("/contacts/:id/reply", adminProtect, replyToContact);
router.delete("/contacts/:id", adminProtect, deleteContact);

export default router;
