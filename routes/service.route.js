import express from "express";
import { createService, deleteService, getServices, updateService } from "../controllers/service.controller.js";


const router = express.Router();

router.get("/", getServices);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;