import { Router } from "express";
import {
  createService,
  getAllServices,
  deleteService,
} from "../controllers/service.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all active services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: List of all active services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Service'
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create a new service (Admin Only)
 *     tags: [Services]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - durationInMinutes
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               durationInMinutes:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Service created successfully
 *       400:
 *         description: all fields is required.
 *       401:
 *         description: Unauthorized request.
 *       409:
 *         description: service already exist.
 *       500:
 *         description: Internal error.
 */

router
  .route("/")
  .get(getAllServices)
  .post(verifyJWT, verifyAdmin, upload.single("image"), createService);

/**
 * @swagger
 * /services/{serviceId}:
 *   delete:
 *     summary: Delete a service (Admin Only)
 *     tags: [Services]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Service ID
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       400:
 *         description: Invalid service id.
 *       401:
 *         description: Unauthorized request.
 *       404:
 *         description: service not found.
 *       500:
 *         description: Internal error.
 */

router.route("/:serviceId").delete(verifyJWT, verifyAdmin, deleteService);

export default router;
