import express from "express";
import { verifyAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyAuth, async (req, res) => {
  const users = await req.app.locals.db.collection("users").find().toArray();
  res.send(users);
});

router.patch("/role/:email", verifyAuth, async (req, res) => {
  const { role } = req.body;
  await req.app.locals.db
    .collection("users")
    .updateOne({ email: req.params.email }, { $set: { role } });
  res.send({ success: true });
});

router.delete("/:email", verifyAuth, async (req, res) => {
  await req.app.locals.db
    .collection("users")
    .deleteOne({ email: req.params.email });
  res.send({ success: true });
});

export default router;
