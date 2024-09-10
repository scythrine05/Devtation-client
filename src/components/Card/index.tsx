import React from "react";
import "./card.style.css";
import { CardData } from "/src/types";

const Card: React.FC<CardData> = ({ title, author, tags }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>
        {tags && tags.map((item, index) => <span key={index}>{item}</span>)}
      </div>
    </div>
  );
};

export default Card;
