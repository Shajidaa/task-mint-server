import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const submission = {
    ...req.body,
    status: "pending",
    createdAt: new Date(),
  };
  await req.app.locals.db.collection("submissions").insertOne(submission);
  res.send({ success: true });
});

router.get("/worker/:email", async (req, res) => {
  const data = await req.app.locals.db
    .collection("submissions")
    .find({ worker_email: req.params.email })
    .toArray();
  res.send(data);
});

router.patch("/approve/:id", async (req, res) => {
  await req.app.locals.db
    .collection("submissions")
    .updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status: "approved" } }
    );
  res.send({ success: true });
});

export default router;
