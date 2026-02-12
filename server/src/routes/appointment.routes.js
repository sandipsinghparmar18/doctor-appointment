import { Router } from "express";
import {
  createAppointment,
  getMyAppointments,
  updateAppointmentStatus,
} from "../controllers/appointment.controller.js";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management APIs
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create new appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - time
 *               - department
 *               - doctorName
 *             properties:
 *               date:
 *                 type: string
 *                 example: 2026-02-15
 *               time:
 *                 type: string
 *                 example: 10:30 AM
 *               department:
 *                 type: string
 *                 example: Cardiology
 *               doctorName:
 *                 type: string
 *                 example: Dr. Sharma
 *               comments:
 *                 type: string
 *                 example: Chest pain issue
 *               report:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get appointments (Admin gets all, Patient gets own)
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of appointments
 *       401:
 *         description: Unauthorized
 */

router
  .route("/")
  .post(verifyJWT, upload.single("report"), createAppointment)
  .get(verifyJWT, getMyAppointments);

/**
 * @swagger
 * /appointments/{appointmentId}:
 *   patch:
 *     summary: Update appointment status (Admin only)
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [confirmed, cancelled]
 *                 example: confirmed
 *     responses:
 *       200:
 *         description: Appointment updated
 *       400:
 *         description: Invalid status
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Appointment not found
 */

router
  .route("/:appointmentId")
  .patch(verifyJWT, verifyAdmin, updateAppointmentStatus);

export default router;
