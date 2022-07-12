import React, { useContext } from 'react';
import tableContext from '../context/tableContext';

function Filters() {
  const { inputName,
    setInputName,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    inputNumber,
    setInputNumber,
    // filterByNumericValues,
    setFilterByNumericValues } = useContext(tableContext);

  const teste = (() => {
    setFilterByNumericValues(
      { inputName, columnFilter, comparisonFilter, inputNumber },
    );
  });
  return (
    <div>
      <h3>Filtros</h3>
      <fieldset>
        {/* <legend>Filtros:</legend> */}
        <input
          data-testid="name-filter"
          name="filter name"
          type="text"
          value={ inputName }
          onChange={ (e) => setInputName(e.target.value) }
        />
        <label htmlFor="column-filter">
          {' '}
          Coluna
          {' '}
          <select
            data-testid="column-filter"
            name="column-filter"
            value={ columnFilter }
            onChange={ (e) => setColumnFilter(e.target.value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          {' '}
          Operador
          {' '}
          <select
            data-testid="comparison-filter"
            name="comparison-filter"
            value={ comparisonFilter }
            onChange={ (e) => setComparisonFilter(e.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            data-testid="value-filter"
            name="value-filter"
            type="number"
            value={ inputNumber }
            onChange={ (e) => setInputNumber(e.target.value) }
          />
        </label>
        <button
          data-testid="button-filter"
          type="submit"
          onClick={ teste }
        >
          Filtrar

        </button>

      </fieldset>
    </div>
  );
}
export default Filters;
