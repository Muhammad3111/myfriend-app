import mongoose, { Schema } from "mongoose";

export type ProductType = {
  _id: string;
  title: string;
  price_received: number;
  expense: number;
  price: number;
  imei: string;
  percent_of_battery: string;
  category: mongoose.Types.ObjectId;
  sold: boolean;
};

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price_received: {
    type: Number,
    required: true,
  },
  expense: {
    type: Number,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  imei: {
    type: String,
    required: true,
  },
  percent_of_battery: {
    type: String,
    required: false,
  },
  category: {
    type: Schema.Types.ObjectId, // Kategoriyaning ObjectId sifatida
    ref: "Categories", // Kategoriyani model nomi
    required: true,
  },
  sold: {
    type: Boolean,
    required: false,
  },
});

const Products = mongoose.model<ProductType>("Products", ProductSchema);

export default Products;
