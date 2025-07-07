import React, { useEffect, useState } from "react";
import css from "./Header.module.css";
import axios from "axios";
import { clearAuthHeader, setAuthHeader } from "../redux/auth/operations";

const Header = () => {
  axios.defaults.baseURL = "https://wallet.b.goit.study/api";
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    setAuthHeader(token);
    const getUser = async () => {
      try {
        const response = await axios.get(
          "https://wallet.b.goit.study/api/auth/sign-up"
        );
        console.log(response);

        const email = response.data.user.email;
        const userName = email.split("@")[0];
        setUsername(userName);
      } catch (error) {
        console.error("Kullanıcı bilgisini alamadık!");
      }
    };
    getUser();
  }, []);

  const handleLogout = () => {
    clearAuthHeader(token);
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div className={css.header}>
      <div>
        <img
          src="../assets/images/Logo-Mobile.png"
          alt="money_guarg_logo"
          className={css.logo}
        />
      </div>
      <div>
        <p className={css.username}>{username || "..."}</p>
        <img
          src="../assets/images/exit.png"
          alt="çıkış"
          className={css.exitImage}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Header;
