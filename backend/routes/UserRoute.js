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
import {getUser, Register} from "../controllers/UserController.js";

const router = express.Router();

router.get('/user', getUser);
router.post('/user', Register);

export default router;