import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import problemRoutes from "./src/routes/problem.routes.js";
import executionRoute from "./src/routes/execute-code.routes.js";
import submissionRoutes from "./src/routes/submission.routes.js";
import playlistRoutes from "./src/routes/playlist.routes.js";
import cors from "cors";
import aiRoutes from "./src/routes/ai.routes.js";
import likeRoutes from "./src/routes/like.routes.js";
import savedProblemRoutes from "./src/routes/saveProblem.routes.js";
import markedProblemForRevisionRoutes from "./src/routes/markedProblemForRevision.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problem", problemRoutes);
app.use("/api/v1/execute-code", executionRoute);
app.use("/api/v1/submissions", submissionRoutes);
app.use("/api/v1/playlist", playlistRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/like", likeRoutes);
app.use("/api/v1/save-problem", savedProblemRoutes);
app.use("/api/v1/mark-problem", markedProblemForRevisionRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
