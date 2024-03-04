import React, { createContext, useState, useEffect } from "react";
import upgradesData from "../data/upgradesData";
export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [money, setMoney] = useState(1);
  const [currentVenue, setCurrentVenue] = useState(1);
  const [unlockedGames, setUnlockedGames] = useState({
    blackjack: false,
    craps: false,
    poker: false,
    roulette: false,
    slots: true,
  });
  const [upgrades, setUpgrades] = useState({
    games: {
      craps: {
        level: 0,
        bonuses: { visitorRate: 0, idleIncomeRate: 0, incomeMultiplier: 0 },
        tables: {
          purchased: [],
          visitorRate: 0,
          idleIncomeRate: 0,
          incomeMultiplier: 0,
        },
      },
      slots: {
        level: 0,
        bonuses: { visitorRate: 0, idleIncomeRate: 0, incomeMultiplier: 0 },
        tables: {
          purchased: [],
          visitorRate: 0,
          idleIncomeRate: 0,
          incomeMultiplier: 0,
        },
      },
      blackjack: {
        level: 0,
        bonuses: { visitorRate: 0, idleIncomeRate: 0, incomeMultiplier: 0 },
        tables: {
          purchased: [],
          visitorRate: 0,
          idleIncomeRate: 0,
          incomeMultiplier: 0,
        },
      },
      poker: {
        level: 0,
        bonuses: { visitorRate: 0, idleIncomeRate: 0, incomeMultiplier: 0 },
        tables: {
          purchased: [],
          visitorRate: 0,
          idleIncomeRate: 0,
          incomeMultiplier: 0,
        },
      },
      roulette: {
        level: 0,
        bonuses: { visitorRate: 0, idleIncomeRate: 0, incomeMultiplier: 0 },
        tables: {
          purchased: [],
          visitorRate: 0,
          idleIncomeRate: 0,
          incomeMultiplier: 0,
        },
      },
    },
    furniture: {
      chair: {
        level: 0,
        bonuses: { visitorRate: 0, idleIncomeRate: 0, incomeMultiplier: 0 },
      },
      artwork: {
        level: 0,
        bonuses: { visitorRate: 0, idleIncomeRate: 0, incomeMultiplier: 0 },
      },
    },
  });

  const [totalBonuses, setTotalBonuses] = useState({
    visitorRate: 1,
    idleIncomeRate: 1,
    incomeMultiplier: 1,
  });
  useEffect(() => {
    const newTotalBonuses = Object.values(upgrades.games).reduce(
      (acc, game) => {
        acc.visitorRate += game.bonuses.visitorRate;
        acc.idleIncomeRate += game.bonuses.idleIncomeRate;
        acc.incomeMultiplier *= 1 + game.bonuses.incomeMultiplier + game.level;

        if (game.tables.purchased.length > 0) {
          acc.visitorRate += game.tables.visitorRate;
          acc.idleIncomeRate += game.tables.idleIncomeRate;
          acc.incomeMultiplier *= 1 + game.tables.incomeMultiplier;
        }

        return acc;
      },
      { visitorRate: 1, idleIncomeRate: 1, incomeMultiplier: 1 }
    );

    setTotalBonuses(newTotalBonuses);
  }, [upgrades, currentVenue]);

  //idle income
  useEffect(() => {
    const interval = setInterval(() => {
      setMoney((prevMoney) => prevMoney + totalBonuses.idleIncomeRate);
    }, 1000);

    return () => clearInterval(interval);
  }, [totalBonuses]);

  const getNextVenue = () => {
    const venueKeys = Object.keys(upgradesData.venues).map(Number);
    const currentVenueIndex = venueKeys.indexOf(currentVenue);
    const nextVenueIndex = currentVenueIndex + 1;
    if (nextVenueIndex < venueKeys.length) {
      return venueKeys[nextVenueIndex];
    }
    return null; //if no next venue
  };

  const unlockNextVenue = () => {
    const allUpgradesPurchased = Object.entries(
      upgradesData.venues[currentVenue].games
    ).every(([gameName, gameData]) => {
      const gameBonuses = gameData.bonuses || [];
      const maxUpgradeLevel = Math.max(
        ...gameBonuses.map((bonus) => bonus.level)
      );
      const currentUpgradeLevel = upgrades.games[gameName]?.level || 0;
      return currentUpgradeLevel >= maxUpgradeLevel;
    });

    if (
      allUpgradesPurchased &&
      getNextVenue() !== null &&
      money >= upgradesData.venues[currentVenue].unlockNextVenueCost
    ) {
      setMoney(
        (prevMoney) =>
          prevMoney - upgradesData.venues[currentVenue].unlockNextVenueCost
      );
      const nextGame = upgradesData.venues[currentVenue]?.nextGameUnlocked;
      if (nextGame) {
        setUnlockedGames((prev) => ({
          ...prev,
          [nextGame]: true,
        }));
      }
      const nextVenue = getNextVenue();
      setCurrentVenue(nextVenue);
    }
  };

  return (
    <GameContext.Provider
      value={{
        money,
        setMoney,
        currentVenue,
        totalBonuses,
        unlockedGames,
        upgrades,
        setUpgrades,
        getNextVenue,
        unlockNextVenue,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
