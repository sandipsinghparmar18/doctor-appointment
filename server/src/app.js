import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRoutes from "./routes/user.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";

import { errorHandler } from "./middlewares/error.middleware.js";

import { swaggerUi, swaggerSpec } from "./swagger/swagger.js";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//router declaration
app.get("/", (_, res) => {
  res.send("Server is running");
});
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/appointments", appointmentRoutes);
app.use("/api/v1/services", serviceRoutes);

app.use(errorHandler);

export { app };
