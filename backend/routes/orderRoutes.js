import express from "express";
import {
  createOrder,
  getOrder,
  getHistory,
  updateStatus, 
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/history/all", getHistory);
router.get("/:id", getOrder);
 
router.put("/:id/status", updateStatus);

export default router;