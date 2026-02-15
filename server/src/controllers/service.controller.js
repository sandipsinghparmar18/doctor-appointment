import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Service } from "../models/service.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import mongoose, { isValidObjectId } from "mongoose";

const createService = asyncHandler(async (req, res) => {
  const { name, description, price, durationInMinutes } = req.body;

  if (!name || !price || !durationInMinutes) {
    throw new ApiError(400, "All required fields must be provided");
  }

  const exists = await Service.findOne({ name });
  if (exists) {
    throw new ApiError(409, "Service already exists");
  }

  let imageUrl = "";
  if (req.file?.path) {
    const uploaded = await uploadOnCloudinary(req.file.path);
    imageUrl = uploaded?.secure_url || "";
  }

  const service = await Service.create({
    name,
    description,
    price,
    durationInMinutes,
    image: imageUrl,
  });

  if (!service) {
    throw new ApiError(500, "Internal Server Error during Service creation");
  }

  res
    .status(201)
    .json(new ApiResponse(201, service, "Service created successfully"));
});

const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find({ isActive: true });
  res.status(200).json(new ApiResponse(200, services, "Services fetched"));
});

const deleteService = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  if (!isValidObjectId(serviceId)) {
    throw new ApiError(400, "Invalid Service Id");
  }
  const deleteBefore = await Service.findById(
    new mongoose.Types.ObjectId(serviceId),
  );
  if (!deleteBefore) {
    throw new ApiError(404, "Service not found");
  }

  const deletedService = await Service.findByIdAndDelete(deleteBefore._id);
  if (!deletedService) {
    throw new ApiError(500, "Internal Server Error during Service deleted!");
  }
  const deleteImage = await deleteFromCloudinary(deleteBefore.image);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedService, deleteImage },
        "Service deleted Successfully",
      ),
    );
});

export { createService, getAllServices, deleteService };
