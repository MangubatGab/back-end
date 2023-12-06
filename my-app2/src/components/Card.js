import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ id, title, imageUrl }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} />
      <div className="card-content">
        <h2>{title}</h2>
        <Link to={`/recipe-info/${id}`} className="card-button card-button-text">
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default Card;