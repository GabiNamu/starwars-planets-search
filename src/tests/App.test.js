import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import data from './data';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import PlanetsProvider from '../context/PlanetsProvider';

beforeEach(async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(data),
  }));

  await act(async () => render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>,
  ));
})

test('Verifica de o input de filtro funciona da forma esperada', async () => {

  const inputFilter = await screen.findByRole('textbox');
  expect(inputFilter).toBeInTheDocument();
  const tatooine = await screen.findByRole('cell', {
    name: /tatooine/i
  });
  expect(tatooine).toBeInTheDocument();

  userEvent.type(inputFilter, 'al');

  const alderaan = screen.getByRole('cell', {
    name: /alderaan/i
  });
  expect(alderaan).toBeInTheDocument();
});

test('', () => {
  const selectColumn = screen.getByTestId("column-filter");
  const selectComparison = screen.getByTestId("comparison-filter");
  const inputNumber = screen.getByTestId("value-filter");
  const filterButton = screen.getByRole('button', {
    name: /filtrar/i
  });

  expect(selectColumn).toBeInTheDocument();
  expect(selectComparison).toBeInTheDocument();
  expect(inputNumber).toBeInTheDocument();
  expect(filterButton).toBeInTheDocument();

  userEvent.selectOptions(selectColumn, 'diameter');
  userEvent.selectOptions(selectComparison, 'igual a');
  inputNumber.value = '';
  userEvent.type(inputNumber, '10200');
  userEvent.click(filterButton);

  expect(screen.getByRole('cell', {
    name: /Yavin IV/i
  })).toBeInTheDocument();
  expect(screen.queryByRole('cell', {
    name: /tatooine/i
  })).not.toBeInTheDocument();
});

test('Verifica se o filtro de ordenar os planetas funciona da maneira esperada', () => {
  const selectSort = screen.getByTestId("column-sort");
  const inputRadioAsc = screen.getByRole('radio', {
    name: /asc/i
  });
  const orderButton = screen.getByRole('button', {
    name: /ordenar/i
  });

  expect(selectSort).toBeInTheDocument();
  expect(inputRadioAsc).toBeInTheDocument();
  expect(orderButton).toBeInTheDocument();

  userEvent.selectOptions(selectSort, 'rotation_period');
  userEvent.click(inputRadioAsc);
  userEvent.click(orderButton);
  const planets = ['Bespin', 'Endor', 'Tatooine', 'Hoth', 'Dagobah', 
  'Alderaan', 'Yavin IV', 'Coruscant', 'Naboo', 'Kamino'];
  const planetsArray = screen.getAllByTestId("planet-name");
  planets.forEach((planet, index) => {
   expect(planet).toBe(planetsArray[index].id);
  })

  const inputRadioDesc = screen.getByRole('radio', {
    name: /desc/i
  });
  userEvent.selectOptions(selectSort, 'rotation_period');
  userEvent.click(inputRadioDesc);
  userEvent.click(orderButton);
  const planetsDesc = screen.getAllByTestId("planet-name");
  planets.forEach((planet, index) => {
    expect(planet).not.toBe(planetsDesc[index].id);
   }) 
 
})

test('Verifica se filtro de texto funciona junto do filtro de numerico', () => {
  const inputFilter = screen.getByRole('textbox');
  const selectColumn = screen.getByTestId("column-filter");
  const selectComparison = screen.getByTestId("comparison-filter");
  const inputNumber = screen.getByTestId("value-filter");
  const filterButton = screen.getByRole('button', {
    name: /filtrar/i
  });

  userEvent.type(inputFilter, 't');
  userEvent.selectOptions(selectColumn, 'rotation_period');
  userEvent.selectOptions(selectComparison, 'menor que')
  inputNumber.value = '';
  userEvent.type(inputNumber, '24');
  userEvent.click(filterButton);

  expect(screen.getByText(/tatooine/i)).toBeInTheDocument();
  expect(screen.getByText(/hoth/i)).toBeInTheDocument();
  expect(screen.queryByText(/alderaan/i)).not.toBeInTheDocument();
});

test('Verifica se quando o botão remover todos os filtros é clicado, o filtro é removido', () => {
  const selectColumn = screen.getByTestId("column-filter");
  const selectComparison = screen.getByTestId("comparison-filter");
  const inputNumber = screen.getByTestId("value-filter");
  const filterButton = screen.getByRole('button', {
    name: /filtrar/i
  });

  userEvent.selectOptions(selectColumn, 'diameter');
  userEvent.selectOptions(selectComparison, 'maior que');
  inputNumber.value = '';
  userEvent.type(inputNumber, '9000');
  userEvent.click(filterButton);

  userEvent.selectOptions(selectColumn, 'rotation_period');
  userEvent.selectOptions(selectComparison, 'menor que');
  inputNumber.value = '';
  userEvent.type(inputNumber, '26');
  userEvent.click(filterButton);

  expect(screen.getByText(/diameter maior que 9000/i)).toBeInTheDocument();
  expect(screen.getByText(/rotation_period menor que 26/i)).toBeInTheDocument();
  expect(screen.getByRole('cell', {
    name: /tatooine/i
  })).toBeInTheDocument();
  expect(screen.queryByRole('cell', {
    name: /naboo/i
  })).not.toBeInTheDocument();

  const removeButton = screen.getByRole('button', {
    name: /remover todas filtragens/i
  });
  userEvent.click(removeButton);

  expect(screen.queryByText(/diameter maior que 9000/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/rotation_period menor que 26/i)).not.toBeInTheDocument();
  expect(screen.getByRole('cell', {
    name: /tatooine/i
  })).toBeInTheDocument();
  expect(screen.getByRole('cell', {
    name: /naboo/i
  })).toBeInTheDocument();
})

test('', () => {
  const selectColumn = screen.getByTestId("column-filter");
  const selectComparison = screen.getByTestId("comparison-filter");
  const inputNumber = screen.getByTestId("value-filter");
  const filterButton = screen.getByRole('button', {
    name: /filtrar/i
  });

  userEvent.selectOptions(selectColumn, 'diameter');
  userEvent.selectOptions(selectComparison, 'igual a');
  inputNumber.value = '';
  userEvent.type(inputNumber, '118000');
  userEvent.click(filterButton);

  expect(screen.getByText(/diameter igual a 118000/i)).toBeInTheDocument();
  const removeButton = screen.getByRole('button', {
    name: /x/i
  });
  expect(removeButton).toBeInTheDocument();
  expect(screen.getByRole('cell', {
    name: /bespin/i
  })).toBeInTheDocument();
  expect(screen.queryByRole('cell', {
    name: /tatooine/i
  })).not.toBeInTheDocument();

  userEvent.click(removeButton);
  expect(screen.queryByText(/diameter igual a 118000/i)).not.toBeInTheDocument();
  expect(screen.getByRole('cell', {
    name: /bespin/i
  })).toBeInTheDocument();
  expect(screen.getByRole('cell', {
    name: /tatooine/i
  })).toBeInTheDocument();
})

test('', () => {
  const selectSort = screen.getByTestId("column-sort");
  const inputRadioAsc = screen.getByRole('radio', {
    name: /asc/i
  });
  const orderButton = screen.getByRole('button', {
    name: /ordenar/i
  });

  userEvent.selectOptions(selectSort, 'population');
  userEvent.click(inputRadioAsc);
  userEvent.click(orderButton);
  const planets = ['Yavin IV','Tatooine', 'Bespin', 'Endor', 'Kamino', 'Alderaan', 
  'Naboo', 'Coruscant', 'Hoth', 'Dagobah'];
  const planetsArray = screen.getAllByTestId("planet-name");
  planets.forEach((planet, index) => {
   expect(planet).toBe(planetsArray[index].id);
  })

  const inputRadioDesc = screen.getByRole('radio', {
    name: /desc/i
  });
  userEvent.click(inputRadioDesc);
  userEvent.click(orderButton);

  const planetsDesc = ['Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Endor', 'Bespin', 'Tatooine', 'Yavin IV',  
   'Hoth', 'Dagobah'];
  const planetsArrayDesc = screen.getAllByTestId("planet-name");
  planetsDesc.forEach((planet, index) => {
   expect(planet).toBe(planetsArrayDesc[index].id);
  })
})

test('', () => {
  const selectColumn = screen.getByTestId("column-filter");
  const selectComparison = screen.getByTestId("comparison-filter");
  const inputNumber = screen.getByTestId("value-filter");
  const filterButton = screen.getByRole('button', {
    name: /filtrar/i
  });

  userEvent.selectOptions(selectColumn, 'diameter');
  userEvent.selectOptions(selectComparison, 'maior que');
  inputNumber.value = '';
  userEvent.type(inputNumber, '9000');
  userEvent.click(filterButton);

  userEvent.selectOptions(selectColumn, 'rotation_period');
  userEvent.selectOptions(selectComparison, 'menor que');
  inputNumber.value = '';
  userEvent.type(inputNumber, '26');
  userEvent.click(filterButton);

  userEvent.selectOptions(selectColumn, 'orbital_period');
  userEvent.selectOptions(selectComparison, 'igual a');
  inputNumber.value = '';
  userEvent.type(inputNumber, '304');
  userEvent.click(filterButton);

  expect(screen.getByText(/diameter maior que 9000/i)).toBeInTheDocument();
  expect(screen.getByText(/rotation_period menor que 26/i)).toBeInTheDocument();
  expect(screen.getByText(/orbital_period igual a 304/i)).toBeInTheDocument();
  expect(screen.getByRole('cell', {
    name: /tatooine/i
  })).toBeInTheDocument();
  expect(screen.queryByRole('cell', {
    name: /alderaan/i
  })).not.toBeInTheDocument();
  const removeButton = screen.getAllByRole('button', {
    name: /x/i
  });
  userEvent.click(removeButton[removeButton.length - 1]);
  expect(screen.getByText(/diameter maior que 9000/i)).toBeInTheDocument();
  expect(screen.getByText(/rotation_period menor que 26/i)).toBeInTheDocument();
  expect(screen.queryByText(/orbital_period igual a 304/i)).not.toBeInTheDocument();
  expect(screen.getByRole('cell', {
    name: /tatooine/i
  })).toBeInTheDocument();
  expect(screen.getByRole('cell', {
    name: /alderaan/i
  })).toBeInTheDocument();

  userEvent.click(removeButton[removeButton.length - 2]);
  expect(screen.getByText(/diameter maior que 9000/i)).toBeInTheDocument();
  expect(screen.queryByText(/rotation_period menor que 26/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/orbital_period igual a 304/i)).not.toBeInTheDocument();

})
