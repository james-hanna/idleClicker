// GameTables.jsx
import React, { useContext, useEffect } from "react";
import { GameContext } from "../../contexts/GameContext";
import upgradesData from "../../data/upgradesData";

function GameTables() {
  const [activeTab, setActiveTab] = React.useState(null);
  const {
    money,
    setMoney,
    unlockedGames,
    currentVenue,
    setUpgrades,
    upgrades,
  } = useContext(GameContext);
  const venueData = upgradesData.venues[currentVenue].games;

  const purchaseTable = (gameName, table, index) => {
    if (money >= table.cost) {
      setMoney((prevMoney) => prevMoney - table.cost);
      setUpgrades((prevUpgrades) => {
        const gameUpgrades = prevUpgrades.games[gameName];
        const newVisitorRate =
          gameUpgrades.tables.visitorRate + table.visitorRate;
        const newIdleIncomeRate =
          gameUpgrades.tables.idleIncomeRate + table.idleIncomeRate;
        const newIncomeMultiplier =
          gameUpgrades.tables.incomeMultiplier + table.incomeMultiplier;
        const newPurchasedList = [...gameUpgrades.tables.purchased, index];

        return {
          ...prevUpgrades,
          games: {
            ...prevUpgrades.games,
            [gameName]: {
              ...gameUpgrades,
              tables: {
                visitorRate: newVisitorRate,
                idleIncomeRate: newIdleIncomeRate,
                incomeMultiplier: newIncomeMultiplier,
                purchased: newPurchasedList,
              },
            },
          },
        };
      });
    } else {
      alert("Not enough money!");
    }
  };

  useEffect(() => {
    const firstUnlockedGame = Object.keys(unlockedGames).find(
      (gameName) => unlockedGames[gameName]
    );
    setActiveTab(firstUnlockedGame);
  }, [unlockedGames]);

  return (
    <div>
      <div className="flex w-[100%] justify-center">
        <h2 className="text-2xl font-semibold">Game Tables</h2>
      </div>

      <div className="tabs">
        {Object.keys(unlockedGames)
          .filter((gameName) => unlockedGames[gameName])
          .map((gameName) => (
            <button
              key={gameName}
              className={`tab inline-block py-2 px-4 font-semibold rounded-t-lg ${
                activeTab === gameName
                  ? "text-white bg-blue-500"
                  : "text-blue-500 hover:bg-blue-100"
              }`}
              onClick={() => setActiveTab(gameName)}
            >
              {gameName.charAt(0).toUpperCase() + gameName.slice(1)}
            </button>
          ))}
      </div>
      <hr></hr>
      <div className="tab-content">
        {activeTab && (
          <div>
            <h3>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Tables
            </h3>
            <div
              className="border-2 border-double rounded-lg p-2"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
              }}
            >
              {venueData[activeTab]?.tables.map((table, index) => {
                const isPurchased =
                  upgrades.games[activeTab]?.tables?.purchased?.includes(
                    index
                  ) ?? false;

                return (
                  <div
                    key={index}
                    className="border rounded-lg shadow flex flex-col text-center"
                  >
                    <p>
                      Table {index + 1}:{" "}
                      <span className="font-bold">${table.cost}</span>
                    </p>
                    {isPurchased ? (
                      <span className="bg-green-100 text-green-800 font-bold px-5 py-1 rounded transition ease-in-out duration-150 m-auto">
                        Purchased
                      </span>
                    ) : (
                      <button
                        onClick={() => purchaseTable(activeTab, table, index)}
                        className={`${
                          money >= table.cost
                            ? "bg-blue-500 hover:bg-blue-700 text-white"
                            : "bg-slate-400 hover:bg-slate-500"
                        } font-bold px-5 py-1 rounded transition ease-in-out duration-150 m-auto`}
                        disabled={money < table.cost}
                      >
                        Purchase
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameTables;
