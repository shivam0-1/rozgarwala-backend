import Worker from "../models/Worker.js";

export const getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find()
      .select("-password") // never send password
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json(workers);
  } catch (error) {
    console.error("GET WORKERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch workers" });
  }
};


// GET worker by ID
export const getWorkerById = async (req, res) => {
  try {
    const { id } = req.params;

    const worker = await Worker.findById(id);

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch worker",
      error: error.message,
    });
  }
};
