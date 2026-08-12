import express from 'express';
import { createBooking, getBookings, deleteBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.route('/')
  .post(createBooking)
  .get(getBookings);

router.route('/:id')
  .delete(deleteBooking);

export default router;