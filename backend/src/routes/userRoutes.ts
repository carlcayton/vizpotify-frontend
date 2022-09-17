import express from "express";
import { loginUser, refreshUser } from "../api";
const router = express.Router();

router.post("/login", loginUser);
router.post("/refresh", refreshUser);

export default router;
