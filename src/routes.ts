import { Router } from "express"
import { CreateUserController } from "./controllers/CreateUserController"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { RefreshUserTokenController } from "./controllers/RefreshUserTokenController"
import { GetUserDataController } from "./controllers/GetUserDataController"
import { AuthMiddleware } from "./middlewares/AuthMiddleware"

const router = Router()

const createUserController = new CreateUserController()
router.post('/users', createUserController.handle)

const authController = new AuthenticateUserController()
router.post('/users/login', authController.handle)

const refreshController = new RefreshUserTokenController()
router.post('/users/refresh', refreshController.handle)

const getUserDataController = new GetUserDataController()
router.get('/users/me', AuthMiddleware, getUserDataController.handle)

export default router

