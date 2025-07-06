import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  // Redux'tan loading state'lerini al
  const authLoading = useSelector((state) => state.auth.isRefreshing);
  const transactionsLoading = useSelector((state) => state.transaction.loading);
  const isLoading = useSelector((state) => state.loader.isLoading);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
