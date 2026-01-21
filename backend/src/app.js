import express from "express";
import cors from "cors";

import projectRoutes from "./routes/projectRoutes.js";
import statsRoutes from "./routes/stats.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/stats", statsRoutes);

export default app;
