import { useState } from "react";
import TokenService from "../services/token-service";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const logOutClick = () => {
    TokenService.clearAuthToken();
    TokenService.getUserId = (id) => {
      //console.log(id)
    };

    window.location = "/";
  };
  return (
    <nav className="w-full flex justify-between items-center navbar">
      <img src={logo} alt="KrishiBazaar" className="w-[90px] h-[70px]" />

      {/* <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a id="navi" href={`${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul> */}

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a id="navi" href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
      {TokenService.hasAuthToken() ? (
        <nav className="w-full flex py-6 justify-between items-center navbar ">
          <ul className="list-none sm:flex hidden justify-end items-center flex-1">
            <li className="font-poppins font-normal cursor-pointer text-[18px]">
              <Link to="/">
                <i className="fa fa-home"></i>
                <span className="navlink-text"> Home</span>
              </Link>
            </li>
            <li className="font-poppins font-normal cursor-pointer text-[18px]">
              <Link to="/add-item">
                <i className="fa fa-list"></i>
                <span className="navlink-text"> Add item</span>
              </Link>
            </li>
            <li className="font-poppins font-normal cursor-pointer text-[18px]">
              <Link to="/inventory">
                <i className="fa fa-list"></i>
                <span className="navlink-text"> Inventory</span>
              </Link>
            </li>
            <li className="font-poppins font-normal cursor-pointer text-[18px]">
              <Link to="/signup">
                <FontAwesomeIcon icon={faSackDollar} />
                  100
              </Link>
            </li>
            <li>
              <Link to="/" onClick={logOutClick}>
                <i className="fa fa-sign-out"></i>
                <span className="navlink-text"> Log Out</span>
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="w-full flex py-6 justify-center items-center navbar">
          <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          <li className="font-poppins font-normal cursor-pointer text-[18px]">
              <Link to="/">Home</Link>
            </li>
            <li className="font-poppins font-normal cursor-pointer text-[18px]">
              <Link to="/signup">Sign Up</Link>
            </li>
            <li className="font-poppins font-normal cursor-pointer text-[18px]">
              <Link to="/user/login">Login</Link>
            </li>
          </ul>
        </nav>
      )}
      
    </nav>
    
  );
};

export default Navbar;
