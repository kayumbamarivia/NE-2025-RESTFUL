/**
 * @fileoverview Parking space booking routes for the CPMS application.
 * This file defines endpoints for managing parking space reservations,
 * including creation, retrieval, updates, and cancellation of bookings.
 * 
 * @requires express - Web framework
 * @requires ../controllers/BookingController - Booking management business logic
 * 
 * @note This module is currently commented out and not in use
 */

// import { Router } from 'express';
// import { BookingController } from '../../controllers/BookingController.ts';

// const router = Router();
// const bookingController = new BookingController();

/**
 * Booking Management Routes
 * 
 * @route GET /bookings
 * @description Get all parking space bookings
 * 
 * @route GET /bookings/:id
 * @description Get a specific booking by ID
 * @param {string} id - Booking identifier
 * 
 * @route POST /bookings
 * @description Create a new parking space booking
 * @param {Object} req.body - Booking details including space, time, and user
 * 
 * @route PUT /bookings/:id
 * @description Update an existing booking
 * @param {string} id - Booking identifier
 * @param {Object} req.body - Updated booking details
 * 
 * @route DELETE /bookings/:id
 * @description Cancel a booking
 * @param {string} id - Booking identifier
 */
// router.get('/bookings', bookingController.getAllBookings.bind(bookingController));
// router.get('/bookings/:id', bookingController.getBookingById.bind(bookingController));
// router.post('/bookings', bookingController.createBooking.bind(bookingController));
// router.put('/bookings/:id', bookingController.updateBooking.bind(bookingController));
// router.delete('/bookings/:id', bookingController.deleteBooking.bind(bookingController));

// export const bookingRoutes = router;
