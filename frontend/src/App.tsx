import { Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Incomes from "./pages/Incomes";
import Expenses from "./pages/Expenses";
import SoldProducts from "./pages/SoldProducts";
import AddProduct from "./components/products/AddProduct";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <ToastContainer />
      <Routes>
        <Route index element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/incomes" element={<Incomes />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/sold-products" element={<SoldProducts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
