import { useState } from 'react';

function useFetch() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErros] = useState(null);
  const [renderPlanets, setRenderPlanets] = useState(planets);

  const fetchPlanets = async (url) => {
    setLoading(true);
    try {
      const Promiseplanets = await fetch(url);
      const ResponsePlanets = await Promiseplanets.json();
      console.log(ResponsePlanets);
      ResponsePlanets.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanets(ResponsePlanets.results);
      setRenderPlanets(ResponsePlanets.results);
      setLoading(false);
    } catch (error) {
      setErros(error.message);
    }
  };

  return (
    {
      planets, loading, errors, fetchPlanets, renderPlanets, setRenderPlanets,
    }
  );
}

export default useFetch;
