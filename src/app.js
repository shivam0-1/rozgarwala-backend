import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import adminAuthRoutes from "./routes/adminAuth.routes.js";
import adminContactRoutes from "./routes/adminContact.routes.js";
import workerRoutes from "./routes/worker.routes.js"

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Rozgarwala API is running..");
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin", adminContactRoutes);
app.use("/api/workers", workerRoutes);

export default app;
