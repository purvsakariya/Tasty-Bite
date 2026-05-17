import {Router} from "express"
import { changePassword, loginUser, logoutUser, registerUser } from "../controller/user.controller.js";

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post( logoutUser)
router.route('/changePass').post(changePassword)

export default router;