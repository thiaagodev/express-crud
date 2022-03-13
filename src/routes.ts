import { Router } from "express"
import { CreateUserController } from "./controllers/users/CreateUserController"
import { AuthenticateUserController } from "./controllers/auth/AuthenticateUserController"
import { RefreshUserTokenController } from "./controllers/auth/RefreshUserTokenController"
import { GetUserDataController } from "./controllers/users/GetUserDataController"

import { AuthMiddleware } from "./middlewares/AuthMiddleware"

import { CreatePostController } from "./controllers/posts/CreatePostController"


const router = Router()

const createUserController = new CreateUserController()
router.post('/users', createUserController.handle)

const authController = new AuthenticateUserController()
router.post('/users/login', authController.handle)

const refreshController = new RefreshUserTokenController()
router.post('/users/refresh', refreshController.handle)

const getUserDataController = new GetUserDataController()
router.get('/users/me', AuthMiddleware, getUserDataController.handle)

const createPostController = new CreatePostController()
router.post('/post', AuthMiddleware, createPostController.handle)

export default router

