import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateProfile,
  changePassword,
  updateUserAvatar,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

//AUTH
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: all fields is required.
 *       409:
 *         description: user already exist.
 *       500:
 *         description: Internal error.
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *       400:
 *         description: email and password is required.
 *       404:
 *         description: user not found.
 *       401:
 *         description: Invalid credentials.
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized request.
 */
router.post("/logout", verifyJWT, logoutUser);

// USER
/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current logged in user
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User fetched successfully.
 *       401:
 *         description: Unauthorized request.
 */
router.get("/me", verifyJWT, getCurrentUser);

/**
 * @swagger
 * /users/update-profile:
 *   patch:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: required fiels can not be empty.
 *       401:
 *         description: Unauthorized request.
 *       409:
 *         description: user already exist with these email.
 *       500:
 *         description: Internal error.
 */
router.patch("/update-profile", verifyJWT, updateProfile);

/**
 * @swagger
 * /users/update-password:
 *   patch:
 *     summary: Change user password
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       400:
 *         description: Old and new Password must be required || Invalid old password.
 *       404:
 *         description: user not found.
 *       401:
 *         description: Unauthorized request.
 */
router.patch("/update-password", verifyJWT, changePassword);

/**
 * @swagger
 * /users/update-avatar:
 *   patch:
 *     summary: Update user avatar
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *       400:
 *         description: fields is required.
 *       401:
 *         description: Unauthorized request.
 *       501:
 *         description: Error while uploading the avatar on cloudinary.
 *       500:
 *         description: Internal server error while update the user avatar url.
 */
router.patch(
  "/update-avatar",
  verifyJWT,
  upload.single("avatar"),
  updateUserAvatar,
);

router.post("/refresh-token", refreshAccessToken);

export default router;
