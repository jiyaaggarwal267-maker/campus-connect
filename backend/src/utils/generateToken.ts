import jwt from "jsonwebtoken";
import { Response } from "express";
import mongoose from "mongoose";

const generateToken = (
  res: Response,
  userId: mongoose.Types.ObjectId
) => {
  const token = jwt.sign(
    { userId: userId.toString() },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "30d",
    }
  );

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });
};

export default generateToken;