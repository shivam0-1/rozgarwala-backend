import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    password: String,
    gender: String,
    location: {
      city: String,
      pincode: String,
    },
    role: {
      type: String,
      default: "customer",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
