import React, { useState } from "react";
import css from "./Header.module.css";
import OptimizedImage from "../OptimizedImage/OptimizedImage";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router";
import { logoutModal } from "../Logout/Logout";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.user?.username);
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1280 });

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogOut = () => {
    logoutModal({ dispatch, navigate });
  };

  return (
    <div className={css.header}>
      <div className={css.logoContainer}>
        <OptimizedImage 
          imageName="TabletLogo"
          alt="money_guard_logo" 
          className={css.logo}
          loading="eager"
        />
        <span className={css.logoText}>Money Guard</span>
      </div>
      <div className={css.user}>
        <p className={css.username}>{username} |</p>
        <div className={css.exitButton} onClick={handleLogOut}>
          <OptimizedImage 
            imageName="exit"
            alt="exit button"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
