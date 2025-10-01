import express from 'express'
import { protect } from '../middleware/auth.js'
import { 
    availabilityCarOfDataAndLocationController, createBookingController,
    getUserBookingsController, getOwnerBookingsController, changeBookingStatusController
} from '../controllers/bookingController.js'

const bookingRouter = express.Router()

bookingRouter.post('/cheak-availability', availabilityCarOfDataAndLocationController)
bookingRouter.post('/create', protect, createBookingController)
bookingRouter.get('/user', protect, getUserBookingsController)
bookingRouter.get('/owner', protect, getOwnerBookingsController)
bookingRouter.post('/change-status', protect, changeBookingStatusController)

export default bookingRouter