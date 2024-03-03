import React, { createContext, useState, useEffect } from "react";
import upgradesData from "../data/upgradesData";
export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [money, setMoney] = useState(155000);
  const [currentVenue, setCurrentVenue] = useState(1);
  const [unlockedGames, setUnlockedGames] = useState({
    blackjack: true,
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
      },
      slots: {
        level: 0,
        bonuses: { visitorRate: 0, idleIncomeRate: 0, incomeMultiplier: 0 },
      },
      blackjack: {
        level: 0,
        bonuses: { visitorRate: 0, idleIncomeRate: 0, incomeMultiplier: 0 },
      },
      poker: {
        level: 0,
        bonuses: { visitorRate: 0, idleIncomeRate: 0, incomeMultiplier: 0 },
      },
      roulette: {
        level: 0,
        bonuses: { visitorRate: 0, idleIncomeRate: 0, incomeMultiplier: 0 },
      },
    },
    furniture: {
      chair: {
        level: 0,
        bonuses: { visitorRate: 0, idleIncomeRate: 0, incomeMultiplier: 0 },
      },
      tables: {
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
    // get total bonuses
    const newTotalBonuses = Object.values(upgrades).reduce(
      (acc, category) => {
        Object.values(category).forEach((upgrade) => {
          acc.visitorRate += upgrade.bonuses.visitorRate;
          acc.idleIncomeRate += upgrade.bonuses.idleIncomeRate;
          acc.incomeMultiplier *= 1 + upgrade.bonuses.incomeMultiplier;
        });
        return acc;
      },
      { visitorRate: 0, idleIncomeRate: 0, incomeMultiplier: 1 }
    );

    setTotalBonuses(newTotalBonuses);
  }, [upgrades]);

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
    ).every(([gameName, gameUpgrades]) => {
      const maxUpgradeLevel = Math.max(
        ...gameUpgrades.map((upgrade) => upgrade.level)
      );
      const currentUpgradeLevel = upgrades.games[gameName]?.level || 0;
      return currentUpgradeLevel >= maxUpgradeLevel;
    });
    if (
      allUpgradesPurchased &&
      getNextVenue() !== null &&
      money >= upgradesData.venues[currentVenue].unlockNextVenueCost
    ) {
      const nextVenue = getNextVenue();
      setMoney(money - upgradesData.venues[currentVenue].unlockNextVenueCost);
      setCurrentVenue(nextVenue);
      console.log("New currentVenue:", nextVenue);
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
