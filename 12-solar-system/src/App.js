import React, { Component } from 'react';
import Header from './components/Header';
import SolarSystem from './components/SolarSystem';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <SolarSystem />
      </>
    );
  }
}

export default App;
