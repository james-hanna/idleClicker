import React, { useContext } from "react";
import ClickerButton from "./components/game/ClickerButton";
import Upgrades from "./components/game/Upgrades";
import slum from "./assets/images/slum.png";
import rooftop from "./assets/images/rooftop.png";
import warehouse from "./assets/images/warehouse.png";
import { GameContext } from "./contexts/GameContext";
import GameTables from "./components/game/GameTables";

function App() {
  const { currentVenue } = useContext(GameContext);
  const bgByVenue = {
    1: slum,
    2: rooftop,
    3: warehouse,
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white border-double border-white flex-col">
      <header className="p-6 text-center flex flex-col">
        <h1 className="text-4xl font-bold pb-5">Casino Tycoon</h1>
        <img src={bgByVenue[currentVenue]} className="max-h-[50vh] m-auto" />
      </header>
      <main className="flex flex-col items-center justify-center">
        <ClickerButton />
        <div className="flex space-x-10 h-[315px]">
          <div className="border-double border-white border-2 p-4 rounded-lg w-[30vw] max-w-[400px] overflow-hidden hover:overflow-auto">
            <Upgrades />
          </div>
          <div className="border-double border-white border-2 p-4 rounded-lg w-[50vw] max-w-[720px]">
            <GameTables />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
