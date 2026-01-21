import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  res.json({
    message: "User saved to DB",
    user,
  });
});

export default router;
