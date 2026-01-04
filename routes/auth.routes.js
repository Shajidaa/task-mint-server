import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, role, photoURL } = req.body;
  const db = req.app.locals.db;

  const existing = await db.collection("users").findOne({ email });
  if (existing) return res.status(409).send("User exists");

  const hash = await bcrypt.hash(password, 10);

  const coin = role === "buyer" ? 50 : 10;

  await db.collection("users").insertOne({
    name,
    email,
    photoURL,
    password: hash,
    role,
    coin,
    createdAt: new Date(),
  });

  res.send({ success: true });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const db = req.app.locals.db;

  const user = await db.collection("users").findOne({ email });
  if (!user) return res.status(404).send("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).send("Invalid credentials");

  res.send({
    email: user.email,
    role: user.role,
    coin: user.coin,
  });
});

export default router;
