import React from "react";
import css from "./Header.module.css";
import logo from "../../assets/images/TabletLogo.png";
import exit from "../../assets/images/exit.png";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { useMediaQuery } from "react-responsive";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router";

const Header = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.user?.username);
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1280 });
  const navigate = useNavigate();
  const handleLogout = () => {
    confirmAlert({
      title: "want to exit?",
      message: "You are about to log out",
      buttons: [
        {
          label: "yes",
          onClick: () => {
            dispatch(logOut());
            localStorage.removeItem("token");
            navigate("/login");
          },
        },
        {
          label: "no",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className={css.header}>
      <div className={css.logoContainer}>
        <img src={logo} alt="money_guard_logo" className={css.logo} />
        <span className={css.logoText}>Money Guard</span>
      </div>
      <div className={css.user}>
        <p className={css.username}>{username} |</p>
        <div className={css.exitButton} onClick={handleLogout}>
          <img src={exit} alt="altButton" />
        </div>
      </div>
    </div>
  );
};

export default Header;
