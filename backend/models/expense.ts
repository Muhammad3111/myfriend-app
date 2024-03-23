import mongoose from "mongoose";

export type ExpenseType = {
  _id: string;
  title: string;
  amount: number;
};

const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Expense = mongoose.model<ExpenseType>("Expense", ExpenseSchema);

export default Expense;
