import express from 'express'
import { changeRoleToOwnerController } from '../controllers/ownerController.js'
import { protect } from '../middleware/auth.js'

const ownerRouter = express.Router()

ownerRouter.post('/change-role', protect, changeRoleToOwnerController)

export default ownerRouter