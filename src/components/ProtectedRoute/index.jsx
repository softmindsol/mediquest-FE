import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Loader";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const { isLoggedIn, isLoading } = useSelector((state) => state?.user);

  if (isLoading) return <Loader />;

  if (!isLoggedIn) {
    return <Navigate to="/log-in" state={{ from: location }} replace />;
  }

  if (isLoggedIn && pathname === "/log-in") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
