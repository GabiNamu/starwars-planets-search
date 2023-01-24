import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function useClick(filters) {
  const { renderPlanets, planets, setRenderPlanets } = useContext(PlanetsContext);
  const [renderFilter, setRenderFilter] = useState([]);
  const [colums, setColums] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const handleClick = () => {
    const newPlanets = renderPlanets.filter((planet) => {
      if (filters.state.quantity === 'menor que') {
        return Number(planet[filters.state.option]) < Number(filters.state.number);
      }
      if (filters.state.quantity === 'igual a') {
        return Number(planet[filters.state.option]) === Number(filters.state.number);
      }
      if (filters.state.quantity === 'maior que') {
        return Number(planet[filters.state.option]) > Number(filters.state.number);
      }
      return planet;
    });
    const newColums = colums.filter((colum) => colum !== filters.state.option);
    setRenderPlanets(newPlanets);
    setColums(newColums);
    filters.setState({ ...filters.state, option: newColums[0] });
    setRenderFilter([...renderFilter,
      `${filters.state.option} ${filters.state.quantity} ${filters.state.number}`]);
  };

  const handleRemove = (event) => {
    const newThing = renderFilter.filter((filter) => filter !== event.target.id);
    setRenderFilter(newThing);
    const str = event.target.id.split(' ');
    setColums([...colums, str[0]]);
    const newArray = newThing.reduce((acumulador, element) => {
      const array = element.split(' ');
      if (`${array[1]} ${array[2]}` === 'menor que') {
        const newRender = acumulador.filter(
          (planet) => Number(planet[array[0]]) < Number(array[3]),
        );
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
    setRenderPlanets(newArray);
  };

  const handleRemoveAllFilters = () => {
    setRenderPlanets(planets);
    setRenderFilter([]);
    setColums(['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water']);
  };
  return (
    {
      handleClick, handleRemove, handleRemoveAllFilters, renderFilter, colums,
    }
  );
}

export default useClick;
