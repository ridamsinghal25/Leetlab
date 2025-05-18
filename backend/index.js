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
import { rateLimit } from "express-rate-limit";
import requestIp from "request-ip";

dotenv.config();

const app = express();

app.use(requestIp.mw());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req) => {
    return req.clientIp;
  },
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "device-remember-token",
      "Access-Control-Allow-Origin",
      "Origin",
      "Accept",
    ],
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
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

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found !!",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
