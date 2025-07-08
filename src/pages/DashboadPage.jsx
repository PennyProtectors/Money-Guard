import Header from "../components/Header";
import React from "react";
import css from "./DashboardPage.module.css";

function DashboadPage() {
  return (
    <div className={css.dashboard}>
      <Header />
      <div>
        <h6>YOUR BALANCE</h6>
        {/* <P>{purchase}</P> */}
      </div>
    </div>
  );
}

export default DashboadPage;
