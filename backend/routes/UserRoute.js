// import express from "express";
// import {
//     getUsers,
//     getUserById,
//     saveUser,
//     updateUser,
//     deleteUser
// } from "../controllers/UserController.js"

// const router = express.Router()

// router.get('/users', getUsers);
// router.get('/users/:id', getUserById);
// router.post('/users', saveUser);
// router.patch('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

// export default router

import express from "express";
import {getUser, Register, Login} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get('/user', verifyToken, getUser);
router.post('/user', Register);
router.post('/login', Login);

export default router;