import React from "react";
import { Outlet } from "react-router-dom";
import Balance from "../Balance/Balance";
import Currency from "../Currency/Currency";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <aside className="sidebar">
        <Balance />
        <Currency />
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
