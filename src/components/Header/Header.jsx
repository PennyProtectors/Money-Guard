import React, { useState } from "react";
import css from "./Header.module.css";
import logo from "../../assets/images/TabletLogo.png";
import exit from "../../assets/images/exit.png";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router";

import { logoutModal } from "../Logout/LogOut";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.user?.username);
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1280 });

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogOut = () => {
    logoutModal({ dispatch, navigate });
  };
  // const handleLogout = () => {
  //   confirmAlert({
  //     customUI: ({ onClose }) => {
  //       return (
  //         <div className={css.logout}>
  //           <img src={logoWithText} className={css.logoutLogo}/>
  //           <p className={css.exitMessg}>Are You sure you want to log out?</p>
  //           <div className={css.btnGroup}>
  //             <button
  //               className={css.yesBtn}
  //               onClick={() => {
  //                 dispatch(logOut());
  //                 localStorage.removeItem("token");
  //                 navigate("/login");
  //                 onClose();
  //               }}
  //             >
  //               LOG OUT
  //             </button>
  //             <button className={css.noBtn} onClick={onClose}>
  //               CANCEL
  //             </button>
  //           </div>
  //         </div>
  //       );
  //     },
  //   });
  // };

  return (
    <div className={css.header}>
      <div className={css.logoContainer}>
        <img src={logo} alt="money_guard_logo" className={css.logo} />
        <span className={css.logoText}>Money Guard</span>
      </div>
      <div className={css.user}>
        <p className={css.username}>{username} |</p>
        <div className={css.exitButton} onClick={handleLogOut}>
          <img src={exit} alt="altButton" />
        </div>
      </div>
    </div>
  );
};

export default Header;
