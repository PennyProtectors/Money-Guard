import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import css from "./DashboardPage.module.css";
import Dashboard from "../components/Dashboard";
import home from "../assets/images/baseline-home-24px 3.png";
import trade from "../assets/images/baseline-timeline-24px 3.png";
import dollar from "../assets/images/baseline-timeline-24px 4.png";
import { useNavigate } from "react-router";
import Balance from "../components/Balance/Balance";
import Currency from "../components/Currency/Currency";

function DashboadPage() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  const handleBalance = () => {
    navigate("/");
  };
  const handleDollar = () => {
    navigate("/");
  };
const [balance,setBalance]=useState(0)
  axios.defaults.baseURL = "https://wallet.b.goit.study/api";

  useEffect(()=>{
    const token=localStorage.getItem("token");
    if(!token) return;
    const fetchBalance=async ()=>{
      const response=await axios.get("/users/current");
      setBalance(response.data.balance)
    }
  })

  return (
    <div className={css.dashboard}>
      <Header />
      <div>
        <div className={css.paths}>
          <img src={home} alt="home" onClick={handleHome}></img>
          <img src={trade} alt="balance" onClick={handleBalance}></img>
          <img src={dollar} alt="dollar" onClick={handleDollar}></img>
        </div>
        <div className={css.yourBalance}>
          <h6 className={css.balance}>YOUR BALANCE</h6>
          {/* <p>{purchase}</p> */}
        </div>

        <main className={css.content}>
          <Balance />
          <Currency />
        </main>

        <Dashboard />
      </div>
    </div>
  );
}

export default DashboadPage;
