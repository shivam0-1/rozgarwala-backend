import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    password: String,
    gender: String,
    skill: [String],
    rate: Number,
    experienceYear: Number,
    location: {
      city: String,
      pincode: String,
    },
    role: {
      type: String,
      default: "worker",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Worker", workerSchema);
