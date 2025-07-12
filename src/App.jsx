import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import DashboadPage from "./pages/DashboadPage"; // ✅ Yazım hatası düzeltildi
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";
import { Toaster } from "react-hot-toast";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useEffect } from "react";
import { refreshUser } from "./redux/auth/operations";

function App() {
  const loading = useSelector((state) => state?.transactions?.loading);
  const isRefreshing = useSelector((state) => state.auth.isRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch]);

  if (isRefreshing) return <Loader />;

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {loading && <Loader />}

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute redirectTo="/login">
              <DashboadPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/">
              <LoginPage />
            </RestrictedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/">
              <RegistrationPage />
            </RestrictedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
