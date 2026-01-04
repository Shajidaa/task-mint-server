import express from "express";
import { verifyAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyAuth, async (req, res) => {
  const task = { ...req.body, createdAt: new Date() };
  await req.app.locals.db.collection("tasks").insertOne(task);
  res.send({ success: true });
});

router.get("/", async (req, res) => {
  const tasks = await req.app.locals.db
    .collection("tasks")
    .find({ required_workers: { $gt: 0 } })
    .toArray();
  res.send(tasks);
});

router.delete("/:id", verifyAuth, async (req, res) => {
  await req.app.locals.db
    .collection("tasks")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.send({ success: true });
});

export default router;
