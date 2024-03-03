import React, { useContext } from "react";
import ClickerButton from "./components/game/ClickerButton";
import Upgrades from "./components/game/Upgrades";
import slum from "./assets/images/slum.webp";
import rooftop from "./assets/images/rooftop.webp";
import { GameContext } from "./contexts/GameContext";

function App() {
  const { currentVenue } = useContext(GameContext);

  return (
    <div className="min-h-screen bg-gray-800 text-white border-double border-white flex-col">
      <header className="p-6 text-center">
        <h1 className="text-4xl font-bold">Casino Tycoon</h1>
      </header>
      <main className="flex flex-col items-center justify-center">
        <img src={currentVenue === 1 ? slum : rooftop} />
        <ClickerButton />
        <Upgrades />
      </main>
    </div>
  );
}

export default App;
