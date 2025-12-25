import express from "express";
import {
  getAllWorkers,
  getWorkerById,
} from "../controllers/worker.controller.js";

const router = express.Router();

router.get("/", getAllWorkers);
router.get("/:id", getWorkerById);

export default router;
