/**
 * @fileoverview Payment processing routes for the CPMS application.
 * This file defines endpoints for handling payment transactions, payment completion,
 * and payment receipt generation.
 * 
 * @requires express - Web framework
 * @requires ../controllers/PaymentController - Payment processing business logic
 * @requires ../middlewares/auth - Authentication middleware
 * @requires ../enums/Role - User role definitions
 * 
 * @note This module is currently commented out and not in use
 */

// import { Router } from "express";
// import { PaymentController } from "../controllers/PaymentController.ts";
// import { protect, restrictTo } from "../middlewares/auth.ts";
// import { Role } from "../enums/Role.ts";

// const router = Router();

/**
 * Payment Processing Routes
 * All routes require authentication for security
 * 
 * @route POST /
 * @description Create a new payment transaction
 * @middleware protect
 * 
 * @route POST /complete
 * @description Complete a pending payment transaction
 * @middleware protect
 * 
 * @route GET /receipt/:paymentId
 * @description Generate and retrieve payment receipt
 * @middleware protect
 * @param {string} paymentId - Unique identifier of the payment
 */
// router.post("/", protect, PaymentController.createPayment);
// router.post("/complete", protect, PaymentController.completePayment);
// router.get("/receipt/:paymentId", protect, PaymentController.getPaymentReceipt);

// export default router; 