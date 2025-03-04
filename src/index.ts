import express from "express";
import JobsRoutes from "./routes/jobs.routes";
import morgan from "morgan";
import helmet from "helmet";
import "dotenv/config";
import path from "path";
import connectdb from "./lib/connectdb";
import APIRoutes from "./routes/API.routes";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/jobs", JobsRoutes);
app.use("/api", APIRoutes);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server is runing at http://localhost:${PORT}`);
  connectdb();
});
