import React, { Component } from 'react';
import Title from './Title';
import PlanetCard from './PlanetCard';
import planets from '../data/planets';

class SolarSystem extends Component {
  render() {
    const mapFunct = (planet) => (
      <PlanetCard
        key={ planet.name }
        planetName={ planet.name }
        planetImage={ planet.image }
      />
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
