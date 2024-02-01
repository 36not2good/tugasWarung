import express from "express";
import {
    getKategoris,
    getKategoriById,
    saveKategori,
} from "../controllers/KategoriControllers.js"

const router = express.Router()

router.get('/kategoris', getKategoris);
router.get('/kategoris/:id', getKategoriById);
router.post('/kategoris', saveKategori);

export default router