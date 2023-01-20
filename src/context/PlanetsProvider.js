import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlanets = async (url) => {
    setLoading(true);
    const Promiseplanets = await fetch(url);
    const ResponsePlanets = await Promiseplanets.json();
    console.log(ResponsePlanets);
    ResponsePlanets.results.map((planet) => {
      delete planet.residents;
      return planet;
    });
    setPlanets(ResponsePlanets.results);
    setLoading(false);
  };

  const values = useMemo(() => ({
    planets, fetchPlanets, loading,
  }), [planets, loading]);

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
