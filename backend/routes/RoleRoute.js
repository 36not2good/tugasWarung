import express from "express";
import {
    getRoles,
    getRoleById,
    saveRole,
} from "../controllers/RoleController.js"

const router = express.Router()

router.get('/roles', getRoles);
router.get('/roles/:id', getRoleById);
router.post('/roles', saveRole);

export default router