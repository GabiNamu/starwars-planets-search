import { useMemo } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import useFetch from '../hooks/useFetch';
// import useFilterName from '../hooks/useFilterName';

function PlanetsProvider({ children }) {
  const { planets, fetchPlanets, loading,
    errors, renderPlanets, setRenderPlanets } = useFetch();

  const values = useMemo(() => ({
    planets,
    fetchPlanets,
    loading,
    errors,
    renderPlanets,
    setRenderPlanets,
  }), [planets, loading, errors, renderPlanets]);

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
