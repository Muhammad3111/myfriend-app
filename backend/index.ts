import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import userRoutes from "./routes/users";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import categoryRoutes from "./routes/category";
import productRoute from "./routes/product";
import expenseRoute from "./routes/expense";
import reportRoute from "./routes/report";

mongoose.connect(process.env.MONGODB_URL as string);
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dilmurod3280.netlify.app",
      "https://dilmurod-frontend.vercel.app",
    ],
    credentials: true,
  })
);
// Server tomonida qo'shimcha headerlarni qo'shish mumkin
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Bu o'zgaruvchini foydalanuvchi tomonidan so'ralgan originga moslashtiring
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/routes", categoryRoutes);
app.use("/api/routes", productRoute);
app.use("/api/routes", expenseRoute);
app.use("/api/routes", reportRoute);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
