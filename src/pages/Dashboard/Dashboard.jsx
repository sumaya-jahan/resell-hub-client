import { Link, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
    const [isAdmin] = useAdmin();

    return (
        <div className="drawer lg:drawer-open">
            <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle"
            />

            <div className="drawer-content flex flex-col p-6">
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-primary drawer-button lg:hidden mb-4"
                >
                    Open Menu
                </label>

                <Outlet />
            </div>

            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>

                <ul className="menu bg-orange-200 text-base-content min-h-full w-80 p-4">
                    {isAdmin ? (
                        <>
                            <li>
                                <Link to="/dashboard/adminHome">
                                    Admin Home
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard/allUsers">
                                    All Users
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/dashboard/userHome">
                                    User Home
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard/myProfile">
                                    My Profile
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard/addProduct">
                                    Add Product
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard/myProducts">
                                    My Products
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard/myOrders">
                                    My Orders
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard/wishlist">
                                    Wishlist
                                </Link>
                            </li>
                        </>
                    )}

                    <div className="divider"></div>

                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li>
                        <Link to="/products">
                            All Products
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;