import React from 'react';
import './App.scss';

import TopBanner from './components/TopBanner'
import News from './components/News'
import TheTable from './components/TheTable';
import Container from '@material-ui/core/Container'

function App() {
  return (
  <div className="App">
    <Container>
      <header className="App-header">
        <TopBanner />
      </header>
      {/* <News /> */}
      <TheTable />
    </Container>
  </div>
  );
}

export default App;
