import express from "express";
import {getUser, Register, Login, Logout} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get('/user', verifyToken, getUser);
router.post('/user', Register);
router.post('/login', Login);
router.delete('/logout', Logout);

export default router;