import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import useOrder from '../hooks/useOrder';

function Table() {
  const { planets, loading, filterName, handleChange,
    renderPlanets, setRenderPlanets } = useContext(PlanetsContext);
  const [colums, setColums] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [renderFilter, setRenderFilter] = useState([]);
  const op = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const { order, handleClickOrder, handleOrder } = useOrder();

  const [filters, setFilters] = useState({
    option: 'population',
    quantity: 'maior que',
    number: 0,
  });

  const handleChan = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = () => {
    const newPlanets = renderPlanets.filter((planet) => {
      if (filters.quantity === 'menor que') {
        console.log(filters.option);
        console.log(Number(planet[filters.option]));
        console.log(Number(planet[filters.option]) < Number(filters.number));
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
    const newColums = colums.filter((colum) => colum !== filters.option);
    setRenderPlanets(newPlanets);
    setColums(newColums);
    setFilters({ ...filters, option: newColums[0] });
    setRenderFilter([...renderFilter,
      `${filters.option} ${filters.quantity} ${filters.number}`]);
  };

  const handleRemove = (event) => {
    const newThing = renderFilter.filter((filter) => filter !== event.target.id);
    setRenderFilter(newThing);
    const str = event.target.id.split(' ');
    setColums([...colums, str[0]]);
    console.log(newThing);
    const newArray = newThing.reduce((acumulador, element) => {
      const array = element.split(' ');
      if (`${array[1]} ${array[2]}` === 'menor que') {
        const newRender = acumulador.filter(
          (planet) => Number(planet[array[0]]) < Number(array[3]),
        );
        console.log(newRender);
        acumulador = newRender;
        return newRender;
      }
      if (`${array[1]} ${array[2]}` === 'maior que') {
        const newRender = acumulador.filter(
          (planet) => Number(planet[array[0]]) > Number(array[3]),
        );
        acumulador = newRender;
        return newRender;
      }
      const newRender = acumulador.filter(
        (planet) => Number(planet[array[0]]) === Number(array[3]),
      );
      acumulador = newRender;
      return acumulador;
    }, planets);

    console.log(newArray);
    setRenderPlanets(newArray);
  };

  const handleRemoveAllFilters = () => {
    console.log(planets);
    setRenderPlanets(planets);
    setRenderFilter([]);
    setColums(['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water']);
  };
  if (loading) {
    return (
      <p>Loading...</p>
    );
  }
  return (
    <div>
      {planets && planets.length > 0 ? (
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
            {colums.map((colum) => (
              <option value={ colum } key={ colum }>{colum}</option>
            ))}
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
          <select
            name="column"
            id="column"
            data-testid="column-sort"
            value={ order.order.column }
            onChange={ handleOrder }
          >
            {op.map((colum) => (
              <option value={ colum } key={ colum }>{colum}</option>
            ))}
          </select>
          <label htmlFor="radio-asc">
            <p>ASC</p>
            <input
              type="radio"
              id="radio-asc"
              data-testid="column-sort-input-asc"
              name="sort"
              onChange={ handleOrder }
              value="ASC"
            />
          </label>
          <label htmlFor="radio-desc">
            <p>DESC</p>
            <input
              type="radio"
              id="radio-desc"
              data-testid="column-sort-input-desc"
              name="sort"
              onChange={ handleOrder }
              value="DESC"
            />
          </label>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ handleClickOrder }
          >
            Ordenar
          </button>
        </div>) : ''}
      <div>
        {renderFilter.length > 0 ? renderFilter.map((filter) => (
          <div key={ filter } data-testid="filter">
            <p>{filter}</p>
            <button
              type="button"
              id={ filter }
              onClick={ handleRemove }
            >
              X
            </button>
          </div>
        )) : ''}
        <div>
          {renderFilter.length > 0 && (
            <button
              type="button"
              data-testid="button-remove-filters"
              onClick={ handleRemoveAllFilters }
            >
              Remover todas filtragens
            </button>)}
        </div>
      </div>
      <table>
        {planets && planets.length > 0 ? (
          <thead>
            <tr>
              {Object.keys(planets[0]).map((planetKey) => (
                <th key={ planetKey }>{planetKey}</th>
              ))}
            </tr>
          </thead>) : '' }

        { planets && planets.length > 0 ? (
          <tbody>
            {renderPlanets.map((planet) => (
              <tr key={ planet.url }>
                <td
                  data-testid="planet-name"
                  id={ planet.name }
                >
                  {planet.name}

                </td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
          </tbody>) : ''}
      </table>
    </div>
  );
}
export default Table;
