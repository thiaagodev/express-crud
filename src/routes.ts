import { Router } from "express"
import { CreateUserController } from "./controllers/CreateUserController"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"

const router = Router()

const createUserController = new CreateUserController()
router.post('/users', createUserController.handle)

const authController = new AuthenticateUserController()
router.post('/users/login', authController.handle)

export default router

