import React from 'react';
import './App.css';

import TopBanner from './components/TopBanner'
import News from './components/News'

function App() {
  return (
  <div className="App">
      <header className="App-header">
        <TopBanner />
        <News />
      </header>
    </div>
  );
}

export default App;
