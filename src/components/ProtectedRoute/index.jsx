import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Loader";
import { verifyToken } from "../../store/features/auth/auth.service";
import { useEffect } from "react";
import { createSelector } from "reselect";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isUserLoggedIn = localStorage.getItem("isLoggedIn");
  const dispatch = useDispatch();

  const selectAuthStatus = createSelector(
    [(state) => state.user.isLoading, (state) => state.user.isLoggedIn],
    (isLoading, isLoggedIn) => ({
      isLoading,
      isLoggedIn,
    })
  );

  const { isLoading, isLoggedIn } = useSelector(selectAuthStatus);

  useEffect(() => {
    if (!isLoggedIn || !isUserLoggedIn) {
      dispatch(verifyToken());
    }
  }, [isLoggedIn, dispatch, isUserLoggedIn]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-white">
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
