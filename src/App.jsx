import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import DashboadPage from "./pages/DashboadPage";

import axios from "axios";

function App() {
  axios.defaults.baseURL = "https://wallet.b.goit.study/api";
const token=localStorage.getItem("token");
if(token){
  axios.defaults.headers.common["Authorization"]=`Bearer ${token}`;
}

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "./components/Loader/Loader";
import { refreshUser } from "./redux/auth/operations";

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
      {loading && <Loader />}
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashboadPage /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
