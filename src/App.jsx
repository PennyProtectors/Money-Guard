import { Route, Routes } from "react-router-dom";
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
  return (
    <>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboadPage/>} />
      </Routes>
    </>
  );
}

export default App;
