import { Link, Outlet } from "react-router-dom";
import useRole from "../../hooks/useRole";

const Dashboard = () => {
  const [role, roleLoading] = useRole();

  if (roleLoading) {
    return (
      <h2 className="text-center mt-10 text-xl">
        Loading Dashboard...
      </h2>
    );
  }

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
          <li className="mb-4">
            <span className="font-bold text-xl">
              {role === "admin"
                ? "Admin Dashboard"
                : role === "seller"
                ? "Seller Dashboard"
                : "Buyer Dashboard"}
            </span>
          </li>

          {role === "admin" && (
            <>
              <li>
                <Link to="/dashboard/adminHome">
                  Overview
                </Link>
              </li>

              <li>
                <Link to="/dashboard/allUsers">
                  Manage Users
                </Link>
              </li>

              <li>
                <Link to="/dashboard/allProducts">
                  Manage Products
                </Link>
              </li>

              <li>
                <Link to="/dashboard/manageOrders">
                  Manage Orders
                </Link>
              </li>

              <li>
                <Link to="/dashboard/myProfile">
                  Profile Settings
                </Link>
              </li>
            </>
          )}

          {role === "seller" && (
            <>
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
                <Link to="/dashboard/manageOrders">
                  Manage Orders
                </Link>
              </li>

              <li>
                <Link to="/dashboard/myProfile">
                  Profile Settings
                </Link>
              </li>
            </>
          )}

          {role === "buyer" && (
            <>
              <li>
                <Link to="/dashboard/userHome">
                  Overview
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

              <li>
                <Link to="/dashboard/paymentHistory">
                  Payment History
                </Link>
              </li>

              <li>
                <Link to="/dashboard/myProfile">
                  Profile Settings
                </Link>
              </li>
            </>
          )}

          <div className="divider"></div>

          <li>
            <Link to="/">
              Home
            </Link>
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