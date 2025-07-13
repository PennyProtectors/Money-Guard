import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css"; // CSS dosyanı buna göre ayarla

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Statistics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/currency"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Currency
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
