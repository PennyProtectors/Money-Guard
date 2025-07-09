import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import DashboadPage from "./pages/DashboadPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "./components/Loader/Loader";
import { refreshUser } from "./redux/auth/operations";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const loading = useSelector((state) => state?.transactions?.loading);
  const isRefreshing = useSelector((state) => state?.auth?.isRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  if (isRefreshing) return <Loader />;

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {loading && <Loader />}
      <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashboadPage /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
