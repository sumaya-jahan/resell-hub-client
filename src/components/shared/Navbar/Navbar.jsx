import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [role] = useRole();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const getDashboardPath = () => {
    if (role === "admin") return "/dashboard/adminHome";
    if (role === "seller") return "/dashboard/myProducts";
    return "/dashboard/userHome";
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ReSell Hub
        </Link>

        <ul className="flex items-center gap-6 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          {user ? (
            <>
              <li>
                <Link
                  to={getDashboardPath()}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to={getDashboardPath()}
                  className="font-semibold hover:text-blue-600"
                >
                  {user.displayName || user.name || "User"}
                </Link>
              </li>

              <li>
                <button onClick={handleLogOut} className="btn btn-sm btn-error">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
