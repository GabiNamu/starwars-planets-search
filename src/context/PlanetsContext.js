import { createContext } from 'react';

const PlanetsContext = createContext({
  planets: [],
  renderPlanets: [],
  filterName: { filter: '' },
  fetchPlanets: () => {},
});

export default PlanetsContext;
