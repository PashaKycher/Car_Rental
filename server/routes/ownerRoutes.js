import express from 'express'
import { protect } from '../middleware/auth.js'
import upload from '../middleware/multer.js'
import { 
    addNewCarController, changeRoleToOwnerController, deleteCarController, updateUserImageController,
    toggleCarAvailabilityController, listOwnerCarsController, deshbordDataController
} from '../controllers/ownerController.js'

const ownerRouter = express.Router()

ownerRouter.post('/change-role', protect, changeRoleToOwnerController)
ownerRouter.post('/add-car', upload.single('image'), protect, addNewCarController)
ownerRouter.get('/cars', protect, listOwnerCarsController)
ownerRouter.post('/toggle-car', protect, toggleCarAvailabilityController)
ownerRouter.post('/delete-car', protect, deleteCarController)
ownerRouter.get('/deshbord', protect, deshbordDataController)
ownerRouter.post('/update-image', upload.single('image'), protect, updateUserImageController)

export default ownerRouter