import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, redirectTo = "/login" }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
