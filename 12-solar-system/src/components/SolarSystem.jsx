import React, { Component } from 'react';
import Title from './Title';
import planets from '../data/planets';
import PlanetCard from './PlanetCard';

class SolarSystem extends Component {
  render() {
    const mapFunct = (planet) => (
      <PlanetCard planetName={ planet.name } planetImage={ planet.image } />
    );

    return (
      <div data-testid="solar-system">
        <Title headline="Planetas" />
        {planets.map(mapFunct)}
      </div>
    );
  }
}

export default SolarSystem;
