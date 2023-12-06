import "./HeroImgStyles.css";
import React from "react";
import IntroImg from "../assets/bg1.jpg";
import { Link } from "react-router-dom";


const HeroImg = () => {
  return <div className="hero">
    <div className="mask">
        <img className="into-img"
        src={IntroImg} alt="IntroImg"/>
    </div>
    <div className="content">
      <h1>How's your plate?
        <p>Find recipe that will suit your diet.</p>
      </h1>
       <Link to="/recipe" className="btn-recipe">Browse recipes</Link>
    </div>
  </div> 
}

export default HeroImg;