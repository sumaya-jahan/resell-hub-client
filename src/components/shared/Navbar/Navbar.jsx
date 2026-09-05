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

  const userName =
    user?.displayName ||
    user?.name ||
    "User";

  const userPhoto =
    user?.photoURL ||
    user?.image;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 whitespace-nowrap"
        >
          ReSell Hub
        </Link>

        <ul className="hidden lg:flex items-center gap-6 font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>

          <li>
            <Link to="/products" className="hover:text-blue-600">
              Products
            </Link>
          </li>

          <li>
            <Link to="/categories" className="hover:text-blue-600">
              Categories
            </Link>
          </li>

          <li>
            <Link to="/about" className="hover:text-blue-600">
              About
            </Link>
          </li>

          <li>
            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </li>

          {user && (
            <li>
              <Link
                to={getDashboardPath()}
                className="hover:text-blue-600"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-2">

          {user ? (
            <details className="dropdown dropdown-end">
              <summary className="btn btn-ghost px-2 flex items-center gap-2">
                {userPhoto ? (
                  <img
                    src={userPhoto}
                    alt={userName}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}

                <span className="hidden sm:block max-w-28 truncate">
                  {userName}
                </span>
              </summary>

              <ul className="dropdown-content menu bg-white rounded-box z-50 mt-3 w-56 p-2 shadow-lg border">
                <li className="px-3 py-2 text-sm text-gray-500 pointer-events-none">
                  {role
                    ? role.charAt(0).toUpperCase() + role.slice(1)
                    : "User"}
                </li>

                <li>
                  <Link to={getDashboardPath()}>
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link to="/dashboard/myProfile">
                    Profile Settings
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogOut}
                    className="text-red-600"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </details>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="btn btn-sm btn-ghost"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-sm btn-primary"
              >
                Register
              </Link>
            </div>
          )}

          <details className="dropdown dropdown-end lg:hidden">
            <summary
              className="btn btn-sm btn-ghost text-xl"
              aria-label="Open navigation menu"
            >
              ☰
            </summary>

            <ul className="dropdown-content menu bg-white rounded-box z-50 mt-3 w-60 p-3 shadow-lg border">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>

              {user ? (
                <>
                  <li>
                    <Link to={getDashboardPath()}>
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <Link to="/dashboard/myProfile">
                      Profile Settings
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleLogOut}
                      className="text-red-600"
                    >
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
          </details>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;