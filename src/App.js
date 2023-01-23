import React, { useContext, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const { fetchPlanets } = useContext(PlanetsContext);
  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets');
  }, []);
  return (
    <div>
      <h1>hi everyone</h1>
      <Table />
    </div>
  );
}

export default App;
