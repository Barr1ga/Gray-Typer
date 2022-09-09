import React from "react";
import { useAppSelector } from "./app/hooks";
import { Criteria } from "./components/Criteria";
import { Footer } from "./components/customIcons/Footer";
import { Header } from "./components/Header";
import { KeyboardDisplay } from "./components/KeyboardDisplay";
import { TextDisplay } from "./components/TextDispaly";

function App() {
  const { keyboard } = useAppSelector((state) => state.criterias);

  return (
    <div className="App">
      <div className="margin-content">
        <Header></Header>
        <div className="type-stack">
          <TextDisplay></TextDisplay>
          {keyboard && <KeyboardDisplay></KeyboardDisplay>}
        </div>
        <Criteria></Criteria>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
