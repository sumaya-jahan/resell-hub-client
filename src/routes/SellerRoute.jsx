import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const SellerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return (
      <h2 className="text-center mt-10">
        Loading...
      </h2>
    );
  }

  if (
    user &&
    (role === "seller" || role === "admin")
  ) {
    return children;
  }

  return (
    <Navigate
      to="/"
      state={{ from: location }}
      replace
    />
  );
};

export default SellerRoute;
