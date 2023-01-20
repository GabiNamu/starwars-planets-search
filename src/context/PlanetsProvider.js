import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import useFetch from '../hooks/useFetch';
// import useFilterName from '../hooks/useFilterName';

function PlanetsProvider({ children }) {
  const { planets, fetchPlanets, loading,
    errors, renderPlanets, setRenderPlanets } = useFetch();
  const [filterName, setFilterName] = useState({ filter: '' });

  const handleChange = (event) => {
    console.log('oiii');
    setFilterName({
      ...filterName,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (filterName.filter.length === 0) {
      setRenderPlanets(planets);
    } else {
      const newPlanets = planets.filter(
        ({ name }) => (name.toLowerCase()).includes(filterName.filter.toLowerCase()),
      );
      setRenderPlanets(newPlanets);
    }
  }, [filterName]);

  const values = useMemo(() => ({
    planets, fetchPlanets, loading, errors, filterName, handleChange, renderPlanets,
  }), [planets, loading, errors, renderPlanets, filterName]);

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
