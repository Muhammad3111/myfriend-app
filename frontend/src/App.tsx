import { Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import AddProduct from "./components/products/AddProduct";
import Incomes from "./pages/Incomes";
import Expenses from "./pages/Expenses";



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
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="/products/add-product"
            element={
              <PrivateRoute>
                <AddProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/incomes"
            element={
              <PrivateRoute>
                <Incomes />
              </PrivateRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <PrivateRoute>
                <Expenses />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
