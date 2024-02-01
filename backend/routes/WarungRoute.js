import express from "express";
import {
    getWarungs,
    getWarungById,
    saveWarung,
    updateWarung,
} from "../controllers/WarungControllers.js"

const router = express.Router()

router.get('/warungs', getWarungs);
router.get('/warungs/:id', getWarungById);
router.post('/warungs', saveWarung);
router.patch('/warungs/:id', updateWarung);

export default router