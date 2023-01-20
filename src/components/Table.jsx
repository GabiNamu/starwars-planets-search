import { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { planets, fetchPlanets, loading } = useContext(PlanetsContext);
  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets');
  }, []);

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }
  console.log(planets);

  return (
    <table>
      <tr>
        { planets && planets.length > 0 ? Object.keys(planets[0]).map((planetKey) => (
          <th key={ planetKey }>{ planetKey }</th>
        )) : ''}
      </tr>

      { planets && planets.length > 0 ? planets.map((planet) => (
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
      )) : ''}
    </table>
  );
}

export default Table;
