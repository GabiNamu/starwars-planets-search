import SearchIcon from '@mui/icons-material/Search';
import { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import useClick from '../hooks/useClick';
import useHandleChange from '../hooks/useHandleChange';
import useOrder from '../hooks/useOrder';

function Filters() {
  const { planets, setRenderPlanets } = useContext(PlanetsContext);
  const { order, handleClickOrder, handleOrder } = useOrder();
  const filterName = useHandleChange({ filter: '' });
  const filters = useHandleChange({
    option: 'population',
    quantity: 'maior que',
    number: 0,
  });
  const { handleClick, handleRemove,
    handleRemoveAllFilters, renderFilter, colums } = useClick(filters);
  const op = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  useEffect(() => {
    if (filterName.state.filter.length === 0) {
      setRenderPlanets(planets);
    } else {
      const newPlanets = planets.filter(
        ({ name }) => (name.toLowerCase())
          .includes(filterName.state.filter.toLowerCase()),
      );
      setRenderPlanets(newPlanets);
    }
  }, [filterName.state]);

  return (
    <div>
      {planets && planets.length > 0 ? (
        <div className="table-div-all-filters">
          <div className="div-input-icon">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Pesquise por planetas"
              className="table-input-text"
              data-testid="name-filter"
              name="filter"
              value={ filterName.state.filter }
              onChange={ filterName.handleChange }
            />

          </div>
          <div className="table-div-filters">
            <label htmlFor="column">
              <p className="tabble-column-select-label">Coluna</p>
              <select
                name="option"
                className="table-column-select"
                id="column"
                data-testid="column-filter"
                value={ filters.state.option }
                onChange={ filters.handleChange }
              >
                {colums.map((colum) => (
                  <option value={ colum } key={ colum }>{colum}</option>
                ))}
              </select>
            </label>
            <label htmlFor="quantity">
              <p className="tabble-column-select-label">Operador</p>
              <select
                name="quantity"
                id="quantity"
                data-testid="comparison-filter"
                className="table-column-select"
                value={ filters.state.quantity }
                onChange={ filters.handleChange }
              >
                <option value="maior que">maior que</option>
                <option value="menor que">menor que</option>
                <option value="igual a">igual a</option>
              </select>
            </label>
            <input
              type="number"
              className="table-input-number"
              data-testid="value-filter"
              name="number"
              value={ filters.state.number }
              onChange={ filters.handleChange }
            />
            <button
              data-testid="button-filter"
              className="table-filter-button"
              type="button"
              onClick={ handleClick }
            >
              Filtrar
            </button>
            <label htmlFor="column">
              <p className="tabble-column-select-label">Ordenar</p>
              <select
                name="column"
                id="column"
                className="table-column-select"
                data-testid="column-sort"
                value={ order.order.column }
                onChange={ handleOrder }
              >
                {op.map((colum) => (
                  <option value={ colum } key={ colum }>{colum}</option>
                ))}
              </select>
            </label>
            <div>
              <label htmlFor="radio-asc" className="table-div-radio">
                <input
                  type="radio"
                  id="radio-asc"
                  className="table-radio"
                  data-testid="column-sort-input-asc"
                  name="sort"
                  onChange={ handleOrder }
                  value="ASC"
                />
                <p className="table-radio-name">Ascendente</p>
              </label>
              <label htmlFor="radio-desc" className="table-div-radio">
                <input
                  type="radio"
                  className="table-radio"
                  id="radio-desc"
                  data-testid="column-sort-input-desc"
                  name="sort"
                  onChange={ handleOrder }
                  value="DESC"
                />
                <p className="table-radio-name">Descendente</p>
              </label>
            </div>
            <button
              type="button"
              className="table-filter-button"
              data-testid="column-sort-button"
              onClick={ handleClickOrder }
            >
              Ordenar
            </button>
          </div>
        </div>) : ''}

      <div>
        {renderFilter.length > 0 ? renderFilter.map((filter) => (
          <div key={ filter } data-testid="filter" className="table-remove-div">
            <p className="table-remove-name">{filter}</p>
            <button
              className="table-remove"
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
              className="table-remove-all"
              onClick={ handleRemoveAllFilters }
            >
              Remover todas filtragens
            </button>)}
        </div>
      </div>
    </div>
  );
}

export default Filters;
