import React from "react";
import css from "./Header.module.css";
import logo from "../assets/images/TabletLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/auth/operations";
import { useMediaQuery } from "react-responsive";

const Header = () => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.auth.user?.username);
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1280 });

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.header}>
      <div className={css.logoContainer}>
        <img src={logo} alt="money_guard_logo" className={css.logo} />
        <span className={css.logoText}>Money Guard</span>
      </div>
      <div className={css.user}>
        <p className={css.username}>{username || "Name"}</p>
        <div className={css.exitButton} onClick={handleLogout}>
          <span>Exit</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
