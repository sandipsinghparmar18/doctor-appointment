import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    durationInMinutes: {
      type: Number,
      required: true,
    },

    image: {
      type: String, // Cloudinary URL
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Service = mongoose.model("Service", serviceSchema);
