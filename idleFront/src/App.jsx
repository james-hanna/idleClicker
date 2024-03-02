import React from "react";
import ClickerButton from "./components/game/ClickerButton";
import Upgrades from "./components/game/Upgrades";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Casino Tycoon</h1>
      </header>
      <main>
        <ClickerButton />
        <Upgrades />
      </main>
    </div>
  );
}

export default App;
