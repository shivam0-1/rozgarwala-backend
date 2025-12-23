import bcrypt from "bcryptjs";
import WorkerProfile from "../models/Worker.js";
import CustomerProfile from "../models/Customer.js";
import generateToken from "../utils/generateToken.js";

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { role, password } = req.body;

    if (!role || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "worker") {
      const worker = await WorkerProfile.create({
        ...req.body,
        password: hashedPassword,
        role: "worker",
      });

      return res.status(201).json({
        token: generateToken(worker),
        role: "worker",
      });
    }

    if (role === "customer") {
      const customer = await CustomerProfile.create({
        ...req.body,
        password: hashedPassword,
        role: "customer",
      });

      return res.status(201).json({
        token: generateToken(customer),
        role: "customer",
      });
    }

    return res.status(400).json({ message: "Invalid role" });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const Model =
      role === "worker" ? WorkerProfile : CustomerProfile;

    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json({
      token: generateToken(user),
      role,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Login failed" });
  }
};
