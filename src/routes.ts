import { Router } from "express"
import { CreateUserController } from "./controllers/CreateUserController"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { RefreshUserTokenController } from "./controllers/RefreshUserTokenController"

const router = Router()

const createUserController = new CreateUserController()
router.post('/users', createUserController.handle)

const authController = new AuthenticateUserController()
router.post('/users/login', authController.handle)

const refreshController = new RefreshUserTokenController()
router.post('/users/refresh', refreshController.handle)

export default router

