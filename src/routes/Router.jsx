import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import AllProducts from "../pages/AllProducts/AllProducts";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import AddProduct from "../pages/AddProduct/AddProduct";
import MyProducts from "../pages/MyProducts/MyProducts";
import MyOrders from "../pages/MyOrders/MyOrders";
import Wishlist from "../pages/Wishlist/Wishlist";
import UpdateProduct from "../pages/UpdateProduct/UpdateProduct";

import AdminHome from "../pages/Dashboard/AdminHome";
import AllUsers from "../pages/Dashboard/AllUsers";
import AllProductsAdmin from "../pages/Dashboard/AllProductsAdmin";
import ManageOrders from "../pages/Dashboard/ManageOrders";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import BuyerRoute from "./BuyerRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "products",
        element: <AllProducts />,
      },

      {
        path: "products/:id",
        element: <ProductDetails />,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  {
    path: "/dashboard",

    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),

    children: [
      {
        path: "userHome",
        element: (
          <BuyerRoute>
            <h2 className="text-3xl font-bold">
              Buyer Dashboard
            </h2>
          </BuyerRoute>
        ),
      },

      {
        path: "myProfile",
        element: (
          <h2 className="text-3xl font-bold">
            My Profile
          </h2>
        ),
      },

      {
        path: "myOrders",
        element: (
          <BuyerRoute>
            <MyOrders />
          </BuyerRoute>
        ),
      },

      {
        path: "wishlist",
        element: (
          <BuyerRoute>
            <Wishlist />
          </BuyerRoute>
        ),
      },

      {
        path: "addProduct",
        element: (
          <SellerRoute>
            <AddProduct />
          </SellerRoute>
        ),
      },

      {
        path: "myProducts",
        element: (
          <SellerRoute>
            <MyProducts />
          </SellerRoute>
        ),
      },

      {
        path: "updateProduct/:id",
        element: (
          <SellerRoute>
            <UpdateProduct />
          </SellerRoute>
        ),
      },

      {
        path: "manageOrders",
        element: (
          <SellerRoute>
            <ManageOrders />
          </SellerRoute>
        ),
      },

      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },

      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },

      {
        path: "allProducts",
        element: (
          <AdminRoute>
            <AllProductsAdmin />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
