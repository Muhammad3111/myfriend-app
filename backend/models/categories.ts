import mongoose from "mongoose";

type CategoryType = {
  _id: string;
  title: string;
};

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Categories = mongoose.model<CategoryType>("Categories", CategorySchema);

export default Categories;
