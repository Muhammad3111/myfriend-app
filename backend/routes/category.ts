import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Category from "../models/categories";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/category",
  verifyToken,
  [body("title").notEmpty().withMessage("Bo'lim nomini yozish majburiy")],
  async (req: Request, res: Response) => {
    try {
      // Tasdiqlangan ma'lumotlarni tekshirish
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newCategory: { title: string } = req.body;

      const category = await Category.create(newCategory);

      res.status(201).send(category);
    } catch (e) {
      res.status(500).json({ message: "Serverda xatolik yuzberdi" });
    }
  }
);

router.get("/category", verifyToken, async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik yuzberdi" });
  }
});

router.put(
  "/category/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.id;
      const { title } = req.body;

      // Kategoriyani o'zgartirish
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { title },
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ message: "Bo'lim topilmadi" });
      }

      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: "Serverda xatolik yuzberdi" });
    }
  }
);

router.delete(
  "/category/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.id;

      // Kategoriyani o'chirish
      const deletedCategory = await Category.findByIdAndDelete(categoryId);

      if (!deletedCategory) {
        return res.status(404).json({ message: "Bo'lim topilmadi" });
      }

      res.status(200).json({ message: "Bo'lim o'chirib yuborildi" });
    } catch (error) {
      res.status(500).json({ message: "Serverda xatolik yuzberdi" });
    }
  }
);

export default router;
