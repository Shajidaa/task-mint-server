import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  await req.app.locals.db.collection("payments").insertOne({
    ...req.body,
    createdAt: new Date(),
  });

  await req.app.locals.db
    .collection("users")
    .updateOne({ email: req.body.email }, { $inc: { coin: req.body.coins } });

  res.send({ success: true });
});

export default router;
