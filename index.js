import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import withdrawalRoutes from "./routes/withdrawal.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const db = await connectDB();
app.locals.db = db;

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/submissions", submissionRoutes);
app.use("/payments", paymentRoutes);
app.use("/withdrawals", withdrawalRoutes);
app.use("/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("MicroTasker Backend Running");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
