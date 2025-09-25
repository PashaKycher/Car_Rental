import express from 'express'
import { registerUserController, loginUserController, getUserDataController } from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'

const userRouter = express.Router()

userRouter.post('/register', registerUserController)
userRouter.post('/login', loginUserController)
userRouter.get('/data', protect, getUserDataController)

export default userRouter