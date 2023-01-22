import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function useOrder() {
  const [order, setOrder] = useState({ order: { column: 'population', sort: 'ASC' } });
  const { setRenderPlanets, renderPlanets } = useContext(PlanetsContext);
  const handleClickOrder = () => {
    if (order.order.column === 'surface_water' || order.order.column === 'population') {
      const unknown = renderPlanets.filter(
        (planet) => planet[order.order.column] === 'unknown',
      );
      const obj = renderPlanets.filter(
        (planet) => planet[order.order.column] !== 'unknown',
      );
      if (order.order.sort === 'ASC') {
        obj.sort((a, b) => a[order.order.column] - b[order.order.column]);
        setRenderPlanets([...obj, ...unknown]);
        setOrder({ order: { column: 'population', sort: 'ASC' } });
      } else {
        obj.sort((a, b) => b[order.order.column] - a[order.order.column]);
        setRenderPlanets([...obj, ...unknown]);
        setOrder({ order: { column: 'population', sort: 'ASC' } });
      }
    } else if (order.order.sort === 'ASC') {
      renderPlanets.sort((a, b) => a[order.order.column] - b[order.order.column]);
      setRenderPlanets(renderPlanets);
      setOrder({ order: { column: 'population', sort: 'ASC' } });
    } else {
      renderPlanets.sort((a, b) => b[order.order.column] - a[order.order.column]);
      setRenderPlanets(renderPlanets);
      setOrder({ order: { column: 'population', sort: 'ASC' } });
    }
  };

  const handleOrder = (event) => {
    console.log(event.target.name);
    setOrder({
      order: {
        ...order.order,
        [event.target.name]: event.target.value,
      },
    });
  };
  return (
    { order, handleClickOrder, handleOrder }
  );
}

export default useOrder;
