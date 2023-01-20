import { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { planets, fetchPlanets,
    loading, filterName, handleChange, renderPlanets } = useContext(PlanetsContext);

  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        name="filter"
        value={ filterName.filter }
        onChange={ handleChange }
      />
      <table>
        <thead>
          <tr>
            {planets && planets.length > 0 ? Object.keys(planets[0]).map((planetKey) => (
              <th key={ planetKey }>{ planetKey }</th>
            )) : ''}
          </tr>
        </thead>

        <tbody>
          { renderPlanets.map((planet) => (
            <tr key={ planet.url }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period}</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
