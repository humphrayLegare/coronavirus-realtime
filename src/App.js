import React from 'react';
import './App.scss';

import TopBanner from './components/TopBanner'
import News from './components/News'
import Album from './components/Album'

function App() {
  return (
  <div className="App">
      <header className="App-header">
        <TopBanner />
      </header>
      
      {/* <News /> */}
      <Album />
    </div>
  );
}

export default App;
