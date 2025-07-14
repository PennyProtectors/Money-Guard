import React from "react";
import css from "./Logout.module.css";
import { logOut } from "../../redux/auth/operations"

import logoWithText from "../../assets/images/logo.png";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
export const logoutModal = ({ dispatch, navigate }) => {
 
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className={css.logout}>
          <img src={logoWithText} className={css.logoutLogo} />
          <p className={css.exitMessg}>Are You sure you want to log out?</p>
          <div className={css.btnGroup}>
            <button
              className={css.yesBtn}
              onClick={() => {
                dispatch(logOut());
                localStorage.removeItem("token");
                navigate("/login");
                onClose();
              }}
            >
              LOG OUT
            </button>
            <button className={css.noBtn} onClick={onClose}>
              CANCEL
            </button>
          </div>
        </div>
      );
    },
  });
};
