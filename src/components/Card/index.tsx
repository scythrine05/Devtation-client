import React from "react";
import "./card.style.css";
import { CardData } from "/src/types";
import { Link } from "react-router-dom";

const Card: React.FC<CardData> = ({ _id, title, authorUsername, tags }) => {
  return (
    <div className="card">
      <Link to={`/view/project/${_id}`}>
        <h3>{title}</h3>
      </Link>
      <Link to={`/account/${authorUsername}`}>
        <div>{authorUsername}</div>
      </Link>
      <div>
        {tags && tags.map((item, index) => <span key={index}>{item}</span>)}
      </div>
    </div>
  );
};

export default Card;
