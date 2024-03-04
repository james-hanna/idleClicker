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
    getNextVenue,
    unlockNextVenue,
  } = useContext(GameContext);

  const purchaseUpgrade = (gameName, upgrade) => {
    console.log(gameName);
    console.log(upgrade);
    setMoney(money - upgrade.cost);
    setUpgrades((prev) => {
      const currentGameData = prev.games[gameName];
      const updatedGameData = {
        ...currentGameData,
        level: upgrade.level,
        bonuses: {
          visitorRate:
            upgrade.visitorRate || currentGameData.bonuses.visitorRate,
          idleIncomeRate:
            upgrade.idleIncomeRate || currentGameData.bonuses.idleIncomeRate,
          incomeMultiplier:
            upgrade.incomeMultiplier ||
            currentGameData.bonuses.incomeMultiplier,
        },
      };

      return {
        ...prev,
        games: {
          ...prev.games,
          [gameName]: updatedGameData,
        },
      };
    });
  };

  const getNextUpgrade = (gameName, upgradesList) => {
    const currentLevel = upgrades.games[gameName]?.level || 0;
    return upgradesList.bonuses.find(
      (upgrade) => upgrade.level === currentLevel + 1
    );
  };

  const allUpgradesPurchased = Object.entries(
    upgradesData.venues[currentVenue].games
  )
    .flatMap(([gameName, upgradesList]) => {
      if (!unlockedGames[gameName]) return [];
      const nextUpgrade = getNextUpgrade(gameName, upgradesList);
      return nextUpgrade ? [false] : [true];
    })
    .every(Boolean);

  const nextVenue = getNextVenue();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Upgrades</h2>
      {Object.entries(upgradesData.venues[currentVenue].games)
        .filter(([gameName]) => unlockedGames[gameName])
        .map(([gameName, gameData]) => {
          const nextUpgrade = getNextUpgrade(gameName, gameData);
          if (!nextUpgrade) return null;
          return (
            <div key={gameName} className="mb-4">
              <div className="font-bold">{gameName}</div>
              <h3 className="font-bold">
                {nextUpgrade.name} - Cost: ${nextUpgrade.cost}
              </h3>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded disabled:opacity-50"
                disabled={money < nextUpgrade.cost}
                onClick={() => purchaseUpgrade(gameName, nextUpgrade)}
              >
                Purchase
              </button>
            </div>
          );
        })}

      {allUpgradesPurchased && nextVenue && (
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded disabled:opacity-50"
            disabled={
              money < upgradesData.venues[currentVenue].unlockNextVenueCost
            }
            onClick={unlockNextVenue}
          >
            Unlock Next Venue - Cost: $
            {upgradesData.venues[currentVenue].unlockNextVenueCost}
          </button>
        </div>
      )}
    </div>
  );
}

export default Upgrades;
