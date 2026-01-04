import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  await req.app.locals.db.collection("notifications").insertOne({
    ...req.body,
    time: new Date(),
  });
  res.send({ success: true });
});

router.get("/:email", async (req, res) => {
  const data = await req.app.locals.db
    .collection("notifications")
    .find({ toEmail: req.params.email })
    .sort({ time: -1 })
    .toArray();
  res.send(data);
});

export default router;
