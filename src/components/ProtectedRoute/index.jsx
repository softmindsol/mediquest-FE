import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Loader";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const { isLoggedIn, isLoading } = useSelector((state) => state?.user);

  // If loading, show the loader
  if (isLoading) return <Loader />;

  // Redirect if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/log-in" state={{ from: location }} replace />;
  }

  // Redirect to home if trying to access login page while logged in
  if (isLoggedIn && pathname === "/log-in") {
    return <Navigate to="/" replace />;
  }

  // If all checks pass, return children
  return children;
};

export default ProtectedRoute;
