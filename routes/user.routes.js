import {Router} from "express";
import isLoggedIn from '../middlewares/auth.middleware.js'; // Correct path if the file exists

import {getProfile, login, register, logout} from "../controllers/user.controller.js";


const router = Router();
router.post('/register',register);
router.post('/login',login);
router.get('/logout', logout);
router.get('/me',isLoggedIn,getProfile);

export default router;