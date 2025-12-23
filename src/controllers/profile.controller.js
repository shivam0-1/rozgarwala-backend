import WorkerProfile from "../models/Worker.js";
import CustomerProfile from "../models/Customer.js";

export const getMyProfile = async (req, res) => {
  try {
    const { id, role } = req.user;

    if (role === "worker") {
      const worker = await WorkerProfile.findById(id).select("-password");
      if (!worker) {
        return res.status(404).json({ message: "Worker not found" });
      }
      return res.json(worker);
    }

    if (role === "customer") {
      const customer = await CustomerProfile.findById(id).select("-password");
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      return res.json(customer);
    }

    return res.status(400).json({ message: "Invalid role" });
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    res.status(500).json({ message: "Failed to load profile" });
  }
};
