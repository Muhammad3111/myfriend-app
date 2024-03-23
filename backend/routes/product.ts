import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Product from "../models/product";
import Category from "../models/categories";
import { ProductType } from "../models/product";
import verifyToken from "../middleware/auth";
import { ObjectId } from "mongodb";

const router = express.Router();
router.post(
  "/product",
  verifyToken,
  [
    body("title").notEmpty().withMessage("Mahsulot nomini yozish majburiy"),
    body("price_received")
      .notEmpty()
      .isNumeric()
      .withMessage("Olingan narx raqamda va yozilishi shart"),
    body("expense")
      .notEmpty()
      .isNumeric()
      .withMessage("Xarajatni faqatgina raqamda yozing"),
    body("imei")
      .notEmpty()
      .withMessage("Mahsulot IMEI yoki shtrix raqami yozilishi majburiy"),
    body("category").notEmpty().withMessage("Bo'limni belgilash majburiy"),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newProduct: ProductType = req.body;
      const { category: categoryId } = newProduct;
      const check = ObjectId.isValid(categoryId);
      if (!check) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({ message: "Category does not exist" });
      }

      const product = await Product.create({
        ...newProduct,
        sold: false,
        price: 0,
      });

      res.status(201).send(product);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Serverda xatolik yuz berdi" });
    }
  }
);

router.get("/products", async (req: Request, res: Response) => {
  try {
    // "sold" bo'lmagan mahsulotlar MongoDB so'rovi bilan olinadi
    const availableProducts = await Product.find({ sold: false });

    res.status(200).json(availableProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverda xatolik yuz berdi" });
  }
});

router.get(
  "/sold-products",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const soldProducts = await Product.find({ sold: true });
      res.status(200).json(soldProducts);
    } catch (error) {
      res.status(500).json({ message: "Serverda xatolik yuz berdi" });
    }
  }
);

router.put("/product/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const {
      title,
      price_received,
      expense,
      price,
      imei,
      percent_of_battery,
      category,
      sold,
    } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        title,
        price_received,
        expense,
        price,
        imei,
        percent_of_battery,
        category,
        sold,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik yuzberdi" });
  }
});

router.delete(
  "/product/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Mahsulot topilmadi" });
      }

      res.status(200).json({ message: "Mahsulot o'chirib yuborildi" });
    } catch (error) {
      res.status(500).json({ message: "Serverda xatolik yuz berdi" });
    }
  }
);

export default router;
