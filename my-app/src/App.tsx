import React from "react";
import { useAppSelector } from "./app/hooks";
import { Criteria } from "./components/Criteria";
import { Footer } from "./components/customIcons/Footer";
import { Header } from "./components/Header";
import { KeyboardDisplay } from "./components/KeyboardDisplay";
import { TextDisplay } from "./components/TextDispaly";

function App() {
  const { keyboard } = useAppSelector((state) => state.criterias);
  const { display, typing } = useAppSelector((state) => state.keyboard);

  return (
    <div className="App">
      <div className="margin-content">
        <div style={typing ? display.none : display.block}>
          <Header></Header>
        </div>
        <div className="type-stack">
          <TextDisplay></TextDisplay>
          <div className={keyboard ? "keyboard-panel" : "keyboard-panel keyboard-panel-hide"}>
            <KeyboardDisplay></KeyboardDisplay>
          </div>
        </div>
        <div style={typing ? display.none : display.block}>
          <Criteria></Criteria>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default App;
