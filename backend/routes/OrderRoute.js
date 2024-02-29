import express from "express";
import {
    getOrders,
    getOrderById,
    saveOrder,
    updateOrder,
    deleteOrder
} from "../controllers/OrderController.js";

const router = express.Router()

router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.post('/orders', saveOrder);
router.patch('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);



export default router