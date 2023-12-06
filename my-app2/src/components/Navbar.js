import './NavbarStyles.css';
import { Link } from "react-router-dom";
import React, { useState } from "react";
import {FaBars, FaTimes} from "react-icons/fa";

const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

  return (
    <div className="header">
        <Link to="/">
            <h1>HOW'S YOUR PLATE?</h1>
        </Link>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li >
                <Link to="/home">Home</Link>
            </li>
            <li>
                <Link to="/recipe">Recipe</Link>
            </li> 
            <li>
                <Link to="/favorites">Favorites</Link>
            </li>
        </ul>
      <div className="hamburger" onClick= {handleClick}>
        {click ? (
        <FaTimes size={20} style={{ color: "#fff"}}/>
        ) 
        : ( 
        <FaBars size={20} style={{ color: "#fff"}}/>
        )}
      </div>
    </div>
  );
};

export default Navbar