import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../App.css';

function Table() {
  const { planets, loading,
    renderPlanets } = useContext(PlanetsContext);

  if (loading) {
    return (
      <p className="loading">Loading...</p>
    );
  }
  return (
    <div>
      <table className="table">
        {planets && planets.length > 0 ? (
          <thead className="table-thered">
            <tr className="table-tr-thered">
              {Object.keys(planets[0]).map((planetKey) => (
                <th
                  key={ planetKey }
                  className={ `table-${planetKey} table-th` }
                >
                  {planetKey}
                </th>
              ))}
            </tr>
          </thead>) : '' }

        { planets && planets.length > 0 ? (
          <tbody className="table-tbody">
            {renderPlanets.map((planet) => (
              <tr key={ planet.url } className="table-column">
                <td
                  data-testid="planet-name"
                  id={ planet.name }
                  className="table-tbody-name"
                >
                  {planet.name}

                </td>
                <td className="table-tbody-rotation_period">{planet.rotation_period}</td>
                <td className="table-tbody-orbital_period">{planet.orbital_period}</td>
                <td className="table-tbody-diameter">{planet.diameter}</td>
                <td className="table-tbody-climate">{planet.climate}</td>
                <td className="table-tbody-gravity">{planet.gravity}</td>
                <td className="table-tbody-terrain">{planet.terrain}</td>
                <td className="table-tbody-surface_water">{planet.surface_water}</td>
                <td className="table-tbody-population">{planet.population}</td>
                <td className="table-film">{planet.films}</td>
                <td className="table-tbody-created">{planet.created}</td>
                <td className="table-tbody-edited">{planet.edited}</td>
                <td className="table-tbody-url">{planet.url}</td>
              </tr>
            ))}
          </tbody>) : ''}
      </table>
    </div>
  );
}
export default Table;
