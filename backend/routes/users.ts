import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/register",
  [check("email", "Email yozish majburiy").isEmail()],
  [check("firstName", "Ism yozish majburiy").isString()],
  [check("lastName", "Familiya yozish majburiy").isString()],
  [
    check(
      "password",
      "Password kamida 6 beligand iborat bo'lishi kerak"
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res
          .status(400)
          .json({ message: "Ushbu foydalanuvchi allaqachon mavjud" });
      }
      user = new User(req.body);
      await user.save();
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_KEY as string,
        { expiresIn: "1d" }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res
        .status(200)
        .send({ message: "Foydalanuvchi ro'yxatga olindi" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Serverda xatolik yuzberd" });
    }
  }
);

export default router;
