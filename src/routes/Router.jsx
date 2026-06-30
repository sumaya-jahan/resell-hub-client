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
import UpdateProduct from "../pages/UpdateProduct/UpdateProduct";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

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
                    <h2 className="text-3xl font-bold">
                        User Home
                    </h2>
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
                path: "addProduct",
                element: <AddProduct />,
            },
            {
                path: "myProducts",
                element: <MyProducts />,
            },
            {
                path: "myOrders",
                element: <MyOrders />,
            },
            {
                path: "updateProduct/:id",
                element: <UpdateProduct />,
            },
            {
                path: "adminHome",
                element: (
                    <AdminRoute>
                        <h2 className="text-3xl font-bold">
                            Admin Home
                        </h2>
                    </AdminRoute>
                ),
            },
            {
                path: "allUsers",
                element: (
                    <AdminRoute>
                        <h2 className="text-3xl font-bold">
                            All Users
                        </h2>
                    </AdminRoute>
                ),
            },
        ],
    },
]);

export default router;