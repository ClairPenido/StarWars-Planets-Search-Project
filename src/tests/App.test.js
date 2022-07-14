import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import dataAPI from '../Mocks/dataAPI';
import userEvent from '@testing-library/user-event';

describe('Testando a requesicão da API', () => {
test('Testando a requesicão da API', () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
     json: () => Promise.resolve(dataAPI),
    }));
    render(<App />)
  })
  jest.clearAllMocks();
})
test('Verifica inputName', async () => {
  jest.spyOn(global, 'fetch')
  .mockImplementation(() => Promise.resolve({
   json: () => Promise.resolve(dataAPI),
  }));
  render (<App />);
  const searchInput = screen.getByTestId('name-filter');
  expect(searchInput).toBeInTheDocument();

  const planetName = await screen.findByText('Tatooine');
  const buttonFilter = await screen.findByTestId('button-filter');
  expect(planetName).toBeInTheDocument();
  userEvent.click(buttonFilter);

  const buttonSelect = screen.getByTestId('comparison-filter');
  expect(buttonSelect).toBeInTheDocument();
  userEvent.selectOptions(buttonSelect, 'menor que');
  userEvent.click(buttonFilter);
});
