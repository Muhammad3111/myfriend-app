import express, { Request, Response } from "express";
import Products from "../models/product";
import Expense from "../models/expense";

const router = express.Router();

router.get("/report", async (req: Request, res: Response) => {
  try {
    const allProducts = await Products.find({});

    let soldCount = 0;
    let totalSoldPrice = 0;
    let totalProductPrice = 0;
    let totalExpense = 0;
    let totalProfit = 0;
    const IsNotSoldProducts = allProducts.filter((product) => !product.sold);
    allProducts.forEach((product) => {
      if (product.sold) {
        soldCount++;
        totalSoldPrice += product.price;
      }
      totalProductPrice += product.price_received;
      totalExpense += product.expense;
    });

    const allExpense = await Expense.find({});
    allExpense.forEach((expense) => {
      totalExpense += expense.amount;
    });

    totalProfit = totalSoldPrice - totalProductPrice - totalExpense;

    res.status(200).json({
      count: IsNotSoldProducts.length,
      soldCount,
      totalProductPrice,
      totalSoldPrice,
      totalExpense,
      totalProfit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverda xatolik yuz berdi" });
  }
});

export default router;
