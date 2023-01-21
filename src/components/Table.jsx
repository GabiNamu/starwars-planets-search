import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { planets, fetchPlanets,
    loading, filterName, handleChange,
    renderPlanets, setRenderPlanets } = useContext(PlanetsContext);

  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filters, setFilters] = useState({
    option: 'population',
    quantity: 'maior que',
    number: 0,
  });

  const handleChan = (event) => {
    console.log('oiii');
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = () => {
    const newPlanets = renderPlanets.filter((planet) => {
      if (filters.quantity === 'menor que') {
        return Number(planet[filters.option]) < Number(filters.number);
      }
      if (filters.quantity === 'igual a') {
        return Number(planet[filters.option]) === Number(filters.number);
      }
      if (filters.quantity === 'maior que') {
        return Number(planet[filters.option]) > Number(filters.number);
      }
      return planet;
    });
    console.log(newPlanets);
    setRenderPlanets(newPlanets);
  };

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
      <select
        name="option"
        id=""
        data-testid="column-filter"
        value={ filters.option }
        onChange={ handleChan }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        name="quantity"
        id=""
        data-testid="comparison-filter"
        value={ filters.quantity }
        onChange={ handleChan }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="number"
        value={ filters.number }
        onChange={ handleChan }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
      >
        Filtrar

      </button>
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
