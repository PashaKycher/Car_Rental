import express from 'express'
import { 
    registerUserController, loginUserController, 
    getUserDataController, getAllCarsController 
} from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'

const userRouter = express.Router()

userRouter.post('/register', registerUserController)
userRouter.post('/login', loginUserController)
userRouter.get('/data', protect, getUserDataController)
userRouter.get('/cars', protect, getAllCarsController)

export default userRouter