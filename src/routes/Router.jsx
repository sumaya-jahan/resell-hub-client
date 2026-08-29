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


const router = createBrowserRouter([

    // ================================
    // PUBLIC ROUTES
    // ================================

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


    // ================================
    // DASHBOARD ROUTES
    // ================================

    {
        path: "/dashboard",

        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),

        children: [

            // USER HOME

            {
                path: "userHome",

                element: (
                    <h2 className="text-3xl font-bold">
                        User Home
                    </h2>
                ),
            },


            // MY PROFILE

            {
                path: "myProfile",

                element: (
                    <h2 className="text-3xl font-bold">
                        My Profile
                    </h2>
                ),
            },


            // ADD PRODUCT

            {
                path: "addProduct",

                element: <AddProduct />,
            },


            // MY PRODUCTS

            {
                path: "myProducts",

                element: <MyProducts />,
            },


            // MY ORDERS

            {
                path: "myOrders",

                element: <MyOrders />,
            },


            // WISHLIST

            {
                path: "wishlist",

                element: <Wishlist />,
            },


            // UPDATE PRODUCT

            {
                path: "updateProduct/:id",

                element: <UpdateProduct />,
            },


            // ================================
            // SELLER - MANAGE ORDERS
            // ================================

            {
                path: "manageOrders",

                element: <ManageOrders />,
            },


            // ================================
            // ADMIN HOME
            // ================================

            {
                path: "adminHome",

                element: (
                    <AdminRoute>
                        <AdminHome />
                    </AdminRoute>
                ),
            },


            // ================================
            // ADMIN - ALL USERS
            // ================================

            {
                path: "allUsers",

                element: (
                    <AdminRoute>
                        <AllUsers />
                    </AdminRoute>
                ),
            },


            // ================================
            // ADMIN - MANAGE PRODUCTS
            // ================================

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