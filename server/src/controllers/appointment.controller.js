import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Appointment } from "../models/appointment.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createAppointment = asyncHandler(async (req, res) => {
  const { date, time, department, doctorName, comments } = req.body;

  if (!date || !time || !department || !doctorName) {
    throw new ApiError(400, "Required fields missing");
  }

  //Prevent past date booking
  const appointmentDate = new Date(date);
  if (appointmentDate < new Date().setHours(0, 0, 0, 0)) {
    throw new ApiError(400, "Cannot book appointment for past date");
  }

  let reportUrl = "";
  if (req.file?.path) {
    const uploaded = await uploadOnCloudinary(req.file.path);
    reportUrl = uploaded?.secure_url || "";
  }

  const appointment = await Appointment.create({
    patient: req.user._id,
    patientName: req.user.name,
    date: appointmentDate,
    time,
    department,
    doctorName,
    comments,
    report: reportUrl,
  });

  res
    .status(201)
    .json(new ApiResponse(201, appointment, "Appointment booked successfully"));
});

const getMyAppointments = asyncHandler(async (req, res) => {
  let appointments;

  if (req.user.userType === "Admin") {
    // Admin sees all
    appointments = await Appointment.find().sort({ createdAt: -1 });
  } else {
    // Patient sees only their own
    appointments = await Appointment.find({
      patient: req.user._id,
    }).sort({ createdAt: -1 });
  }

  res
    .status(200)
    .json(new ApiResponse(200, appointments, "Appointments fetched"));
});

const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  if (!["confirmed", "cancelled"].includes(status)) {
    throw new ApiError(400, "Invalid status value");
  }

  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  if (appointment.status === "cancelled") {
    throw new ApiError(400, "Cannot update cancelled appointment");
  }

  appointment.status = status;
  await appointment.save();

  res
    .status(200)
    .json(new ApiResponse(200, appointment, `Appointment ${status}`));
});

export { createAppointment, getMyAppointments, updateAppointmentStatus };
