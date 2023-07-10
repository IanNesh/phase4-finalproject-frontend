import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton } from "@mui/material";
import {
 
  SearchOutlined,
} from "@mui/icons-material";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";

import { useNavigate } from "react-router-dom";
import { shades } from "../theme";
import { setIsCartOpen, resetCart } from "./state";
import { useState } from "react";
import BookList from "./BookList";
import '../index.css'


const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());

    // reset cart state
    dispatch(resetCart()); 
  };
  
  const [allValue, setAllValue] = useState("all");
  const [allCategories, setAllCategories] = useState(false);

  return (
    <div>
      <nav style={{ backgroundColor: "#D2B48C" }} className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" onClick={() => navigate("/")}>
            Narnia Library
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             
              <li className="nav-item">
                {/* Use IconButton component from MUI */}
                <IconButton
                  sx={{ color: shades.primary }}
                  onClick={() => navigate("/login")}
                >
                  {user ? (
                    <LogoutSharpIcon fontSize="large" />
                  ) : (
                    <LoginSharpIcon fontSize="large" />
                  )}
                </IconButton>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Featured Books
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => setAllValue("all")}
                      
                    >
                      All Books
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => setAllValue("categories")}
                     
          
                    >
                      All Categories
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                <SearchOutlined />
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
