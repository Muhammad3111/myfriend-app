import { toast } from "react-toastify";
import { instance } from "./baseURL";
import { FormTypes } from "./components/LoginForm";
import { CategoryTypes } from "./components/categories/AddCategory";
import { UpdateCategoryTypes } from "./components/categories/UpdateCategory";
import { ProductTypes } from "./components/products/AddProduct";
import { ExpenseTypes } from "./components/expenses/AddExpense";

export const register = async () => {
  const response = await instance.post(
    `users/register`,
    {},
    { withCredentials: true }
  );

  const responseBody = await response.data;

  if (!response) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: FormTypes) => {
  const response = await instance.post(`auth/login`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const validateToken = async () => {
  const response = await instance.get(`/auth/validate-token`, {
    withCredentials: true,
  });

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Token invalid");
  }
};

export const signOut = async () => {
  const response = await instance
    .post(`/auth/logout`, {}, { withCredentials: true })
    .then(() => {
      toast.success("Chiqish bajarildi");
    })
    .catch(() => {
      throw new Error("Error during sign out");
    });

  return response;
};

export const report = async () => {
  const response = await instance.get("routes/report", {
    withCredentials: true,
  });
  return (
    response.data || {
      count: 0,
      soldCount: 0,
      totalProductPrice: 0,
      totalSoldPrice: 0,
      totalExpense: 0,
      totalProfit: 0,
    }
  );
};

export const addCategory = async ({ title }: CategoryTypes) => {
  const response = await instance.post(
    "routes/category",
    { title },
    { withCredentials: true }
  );
  return response.data;
};

export const getCategory = async () => {
  const response = await instance.get("routes/category", {
    withCredentials: true,
  });
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await instance.delete(`routes/category/${id}`, {
    withCredentials: true,
  });
  return response;
};

export const updateCategory = async ({ _id, title }: UpdateCategoryTypes) => {
  const response = await instance.put(
    `routes/category/${_id}`,
    { title },
    { withCredentials: true }
  );
  return response.data;
};

export const getProducts = async () => {
  const response = await instance.get("routes/products", {
    withCredentials: true,
  });
  return response.data;
};

export const addProduct = async (formData: ProductTypes) => {
  const response = await instance.post("routes/product", formData, {
    withCredentials: true,
  });
  return response.data;
};

export const updateProduct = async (formData: UpdateCategoryTypes) => {
  const response = await instance.put(
    `routes/product/${formData._id}`,
    formData,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const deletedProduct = async (id: string) => {
  const response = await instance.delete(`routes/product/${id}`, {
    withCredentials: true,
  });
  return response;
};

export const getSoldProducts = async () => {
  const response = await instance.get("routes/sold-products", {
    withCredentials: true,
  });
  return response.data;
};

export const getExpenses = async () => {
  const response = await instance.get("routes/expense", {
    withCredentials: true,
  });
  return response.data;
};

export const addExpense = async (formData: ExpenseTypes) => {
  const response = await instance.post("routes/expense", formData, {
    withCredentials: true,
  });
  return response;
};

export const deleteExpense = async (id: string) => {
  const response = await instance.delete(`routes/expense/${id}`, {
    withCredentials: true,
  });
  return response;
};

export const updateExpense = async (formData: ExpenseTypes) => {
  const response = await instance.put(
    `routes/expense/${formData._id}`,
    formData,
    { withCredentials: true }
  );
  return response;
};
