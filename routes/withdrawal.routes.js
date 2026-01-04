import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  await req.app.locals.db.collection("withdrawals").insertOne({
    ...req.body,
    status: "pending",
    createdAt: new Date(),
  });
  res.send({ success: true });
});

router.patch("/approve/:id", async (req, res) => {
  await req.app.locals.db
    .collection("withdrawals")
    .updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status: "approved" } }
    );
  res.send({ success: true });
});

export default router;
