import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Loader";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isUserLoggedIn = localStorage.getItem("isLoggedIn");
  const { isLoggedIn, isLoading } = useSelector((state) => state?.user);
  console.log("🚀 ~ ProtectedRoute ~ isLoggedIn:", isLoggedIn);

  if (isLoading) return <Loader />;

  if (isLoggedIn && pathname === "/log-in") {
    return <Navigate to="/" replace />;
  }

  if (!isUserLoggedIn) return <Navigate to="/log-in" />;
  return children;
  


};

export default ProtectedRoute;
