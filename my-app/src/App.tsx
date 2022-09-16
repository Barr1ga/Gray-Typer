import React from "react";
import { useAppSelector } from "./app/hooks";
import { Criteria } from "./components/Criteria";
import { Footer } from "./components/customIcons/Footer";
import { Header } from "./components/Header";
import { KeyboardDisplay } from "./components/KeyboardDisplay";
import { Results } from "./components/Results";
import { TextDisplay } from "./components/TextDispaly";

function App() {
  const { keyboard } = useAppSelector((state) => state.criterias);
  const { display, typing } = useAppSelector((state) => state.keyboard);
  const { completed } = useAppSelector((state) => state.result);
  return (
    <div className="App">
      <div className="margin-content">
        <div style={typing ? display.none : display.block}>
          <Header></Header>
        </div>

        {completed === true && <Results></Results>}

        {completed === false && (
          <div className="type-stack">
            <TextDisplay></TextDisplay>
            <div
              className={
                keyboard
                  ? "keyboard-panel"
                  : "keyboard-panel keyboard-panel-hide"
              }
            >
              <KeyboardDisplay></KeyboardDisplay>
            </div>
          </div>
        )}

        <div style={typing ? display.none : display.block}>
          <Criteria></Criteria>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default App;
