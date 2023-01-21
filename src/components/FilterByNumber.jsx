import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterByNumber() {
  const { renderPlanets, setRenderPlanets } = useContext(PlanetsContext);
  const [filters, setFilters] = useState({
    option: 'population',
    quantity: 'maior que',
    number: 0,
  });

  const handleChange = (event) => {
    console.log('oiii');
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = () => {
    const newPlanets = renderPlanets.filter((planet) => {
      if (filters.quantity === 'menor que') {
        return planet[filters.option] < number;
      }
      if (filters.quantity === 'igual a') {
        return planet[filters.option] === number;
      }
      if (filters.quantity === 'maior que') {
        return planet[filters.option] > number;
      }
      return planet;
    });
    setRenderPlanets(newPlanets);
  };

  return (
    <div>
      <select
        name="option"
        id=""
        data-testid="column-filter"
        value={ filters.option }
        onChange={ handleChange }
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
        onChange={ handleChange }
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
        onChange={ handleChange }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
      >
        Filtrar

      </button>
    </div>
  );
}

export default FilterByNumber();
