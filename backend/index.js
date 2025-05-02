import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import problemRoutes from "./src/routes/problem.routes.js";
import executionRoute from "./src/routes/execute-code.routes.js";
import submissionRoutes from "./src/routes/submission.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problem", problemRoutes);
app.use("/api/v1/execute-code", executionRoute);
app.use("/api/v1/submissions", submissionRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
