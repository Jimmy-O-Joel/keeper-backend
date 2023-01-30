import { Router } from "express"

const router = Router()

import { userRegister, userLogin } from "../controllers/users.js"

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)

export default router