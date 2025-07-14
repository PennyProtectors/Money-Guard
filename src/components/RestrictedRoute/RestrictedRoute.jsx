import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RestrictedRoute = ({ children, redirectTo = "/" }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return !isLoggedIn ? children : <Navigate to={redirectTo} />;
};

export default RestrictedRoute;
