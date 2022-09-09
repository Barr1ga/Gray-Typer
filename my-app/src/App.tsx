import React from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { KeyboardDisplay } from './components/KeyboardDisplay';
import { TextDisplay } from './components/TextDispaly';

function App() {

  return (
    <div className="App">
      <div className="margin-content">
        <Header></Header>
        <div className="type-stack">
          <TextDisplay></TextDisplay>
          <KeyboardDisplay></KeyboardDisplay>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
