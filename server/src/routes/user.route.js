import express from "express";
import { login, logout, register } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/register", register);
router.get("/login", login);
router.get("/logout", logout);

export default router;
