import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Loader";
import { verifyToken } from "../../store/features/auth/auth.service";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isUserLoggedIn = localStorage.getItem("isLoggedIn");
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn } = useSelector((state) => ({
    isLoading: state.user.isLoading,
    isLoggedIn: state.user.isLoggedIn,
  }));

  useEffect(() => {
    if (!isLoggedIn || !isUserLoggedIn) {
      dispatch(verifyToken());
    }
  }, [dispatch, isLoggedIn]);
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );

  if (isLoggedIn && pathname === "/home") {
    return <Navigate to="/" replace />;
  }
  if (!isUserLoggedIn) return <Navigate to="/home" />;

  return children;
};

export default ProtectedRoute;
