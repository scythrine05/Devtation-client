import React from "react";
import Card from "/src/components/Card";

import "./grid.style.css";

const Grid = () => {
  return (
    <div className="grid-container">
      <Card title="Card 1" description="This is the first card." />
      <Card title="Card 2" description="This is the second card." />
      <Card title="Card 3" description="This is the third card." />
      <Card title="Card 4" description="This is the fourth card." />
      <Card title="Card 1" description="This is the first card." />
      <Card title="Card 2" description="This is the second card." />
      <Card title="Card 3" description="This is the third card." />
      <Card title="Card 4" description="This is the fourth card." />
    </div>
  );
};

export default Grid;
