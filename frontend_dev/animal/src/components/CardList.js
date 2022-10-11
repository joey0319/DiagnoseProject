import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import "./CardList.css";
import Card from "./Card.js";

const CardList = ({ cards }) => {
  return (
    <div>
      <div id="card-list">
        {cards.map((card, idx) => (
          <Card card={card} key={card.id} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
