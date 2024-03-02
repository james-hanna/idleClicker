import React, { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import upgradesData from "../../data/upgradesData";

function Upgrades() {
  const {
    money,
    currentVenue,
    unlockedGames,
    upgrades,
    setMoney,
    setUpgrades,
  } = useContext(GameContext);

  const purchaseUpgrade = (category, gameName, upgrade) => {
    setMoney(money - upgrade.cost);
    setUpgrades((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [gameName]: {
          level: upgrade.level,
          bonuses: {
            visitorRate:
              upgrade.visitorRate ||
              prev[category][gameName].bonuses.visitorRate,
            idleIncomeRate:
              upgrade.idleIncomeRate ||
              prev[category][gameName].bonuses.idleIncomeRate,
            incomeMultiplier:
              upgrade.incomeMultiplier ||
              prev[category][gameName].bonuses.incomeMultiplier,
          },
        },
      },
    }));
  };

  const getNextUpgrade = (gameName, upgradesList) => {
    const currentLevel = upgrades.games[gameName]?.level || 0;
    return upgradesList.find((upgrade) => upgrade.level === currentLevel + 1);
  };

  return (
    <div>
      <h2>Upgrades</h2>
      <p>Available Money: ${parseInt(money)}</p>
      {Object.entries(upgradesData.venues[currentVenue].games)
        .filter(([gameName]) => unlockedGames[gameName])
        .map(([gameName, upgradesList]) => {
          const nextUpgrade = getNextUpgrade(gameName, upgradesList);
          if (!nextUpgrade) return null;
          return (
            <div key={gameName}>
              <h3>
                {nextUpgrade.name} - Cost: ${nextUpgrade.cost}
              </h3>
              <button
                disabled={money < nextUpgrade.cost}
                onClick={() => purchaseUpgrade("games", gameName, nextUpgrade)}
              >
                Purchase
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default Upgrades;
