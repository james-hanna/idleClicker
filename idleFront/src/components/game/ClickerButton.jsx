import React, { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";

function ClickerButton() {
  const { money, setMoney, totalBonuses, upgrades } = useContext(GameContext);

  const handleClick = () => {
    console.log(totalBonuses);
    setMoney(money + 1 * totalBonuses.incomeMultiplier);
  };

  return (
    <div className="text-center mt-6">
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleClick}
      >
        Click Me!
      </button>
      <p className="mt-4 text-lg">Money: ${parseInt(money)}.00</p>
    </div>
  );
}

export default ClickerButton;
