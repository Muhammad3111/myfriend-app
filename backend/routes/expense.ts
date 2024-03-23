import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import { body, validationResult } from "express-validator";
import Expense from "../models/expense";

const router = express.Router();

router.post(
  "/expense",
  verifyToken,
  [
    body("title").notEmpty().withMessage("Chiqim nomini yozish shart!!!"),
    body("amount")
      .notEmpty()
      .withMessage("Chiqim qiymat miqdorini yozish shart!!!"),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newExpense: { title: string; amount: number } = req.body;
      const expense = await Expense.create(newExpense);
      res.status(201).send(expense);
    } catch (error) {
      res.status(500).json({ message: "Serverda xatolik yuzberdi" });
    }
  }
);

router.get("/expense", verifyToken, async (req: Request, res: Response) => {
  try {
    const expense = await Expense.find();

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik yuz berdi" });
  }
});

router.put("/expense/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const expenseId = req.params.id;
    const { title, amount } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      { title, amount },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Chiqim topilmadi" });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik yuz berdi" });
  }
});

router.delete(
  "/expense/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const expenseId = req.params.id;
      const deletedExpense = await Expense.findByIdAndDelete(expenseId);
      if (!deletedExpense) {
        return res.status(404).json({ message: "Chiqim topilmadi" });
      }
      res.status(200).json({ message: "Chiqim o'chirib yuborildi" });
    } catch (error) {
      res.status(500).json({ message: "Serverda xatolik yuzberdi" });
    }
  }
);

export default router;
