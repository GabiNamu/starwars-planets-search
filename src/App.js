import React, { useContext, useEffect } from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';
import image from './image/Star_Wars_Logo.png';

function App() {
  const { fetchPlanets } = useContext(PlanetsContext);
  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets');
  }, []);

  return (
    <div>
      <img src={ image } alt="star-wars logo" className="logo" />
      <Filters />
      <Table />
    </div>
  );
}

export default App;
