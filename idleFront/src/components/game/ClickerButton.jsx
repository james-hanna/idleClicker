import React, { useContext, useState } from "react";
import { GameContext } from "../../contexts/GameContext";

function ClickerButton() {
  const { money, setMoney, totalBonuses, currentVenue } =
    useContext(GameContext);

  const handleClick = () => {
    setMoney(money + 1 * totalBonuses.incomeMultiplier);
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me!</button>
      <p>${parseInt(money)}.00</p>
    </div>
  );
}

export default ClickerButton;
