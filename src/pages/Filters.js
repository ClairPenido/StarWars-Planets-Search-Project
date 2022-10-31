/* eslint-disable react/jsx-max-depth */
import React, { useContext, useState, useEffect } from 'react';
import tableContext from '../context/tableContext';
import '../styles/filters_style.css';

// colocar as options em um array e dar o map no select
// ai todas as vezes que a pessoa selecionar com o mouse, ele exclui do array;
const INITIAL_COLUMN_OPTIONS = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
function Filters() {
  const { inputName,
    setInputName,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    inputNumber,
    setInputNumber,
    filterByNumericValues,
    setFilterByNumericValues } = useContext(tableContext);

  const [arrayOptions, setArrayOptions] = useState(INITIAL_COLUMN_OPTIONS);

  const clickSubmitButton = (() => { // toda vez que clicar no botao filtrar, ele tem que remover o option selecionado
    setFilterByNumericValues(
      [...filterByNumericValues,
        { inputName, columnFilter, comparisonFilter, inputNumber }],
    );
    setArrayOptions([...arrayOptions.filter((selected) => selected !== columnFilter)]); // aqui remove
  });
  useEffect(() => {
    setColumnFilter(arrayOptions[0]); // aqui atualiza o value do input com o novo arrayOptions(que é modificado)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayOptions]);

  const clickRemoveFilters = (() => {
    setArrayOptions(INITIAL_COLUMN_OPTIONS);
    setFilterByNumericValues([]);
  });

  const clickRemoveSelectedFilter = (e) => {
    setArrayOptions([...arrayOptions, e]);
    setFilterByNumericValues([...filterByNumericValues
      .filter((clicado) => clicado.columnFilter !== e)]);
  };

  return (
    <div className="body-filter">
      <header>
        <h1> Projeto Star Wars - Trybe </h1>
        <input
          className="filter-name"
          placeholder="buscar planeta"
          data-testid="name-filter"
          name="filter name"
          type="text"
          value={ inputName }
          onChange={ (e) => setInputName(e.target.value) }
        />
      </header>
      <form>
        <label htmlFor="column-filter" className="field">
          <span>Coluna</span>
          <div className="select-filter">
            <select
              data-testid="column-filter"
              name="column-filter"
              value={ columnFilter }
              onChange={ (e) => setColumnFilter(e.target.value) }
            >
              {arrayOptions.map((op, index) => (
                <option key={ index } value={ op }>{ op }</option>)) }
            </select>
          </div>
        </label>
        <label htmlFor="comparison-filter">
          <span>Operador</span>
          <div className="select-filter">
            <select
              className="select-field"
              data-testid="comparison-filter"
              name="comparison-filter"
              value={ comparisonFilter }
              onChange={ (e) => setComparisonFilter(e.target.value) }
            >
              <option value="maior que">maior que</option>
              <option value="menor que">menor que</option>
              <option value="igual a">igual a</option>
            </select>
          </div>
          <input
            className="input-value"
            data-testid="value-filter"
            name="value-filter"
            type="number"
            value={ inputNumber }
            onChange={ (e) => setInputNumber(e.target.value) }
          />
        </label>
        <button
          className="button-filter"
          data-testid="button-filter"
          type="submit"
          onClick={ () => clickSubmitButton() }
        >
          Filtrar
        </button>
        <button
          className="button-filter"
          data-testid="button-remove-filters"
          type="submit"
          onClick={ clickRemoveFilters }
        >
          Remover todas filtragens
        </button>
      </form>
      {filterByNumericValues.map((elem, index) => (
        <p key={ index } data-testid="filter">
          <span value={ columnFilter }>{ elem.columnFilter }</span>
          {' '}
          <span value={ comparisonFilter }>{ elem.comparisonFilter }</span>
          {' '}
          <span value={ inputNumber }>{ elem.inputNumber }</span>
          {' '}
          <button
            type="button"
            onClick={ () => clickRemoveSelectedFilter(elem.columnFilter) }
          >
            X
          </button>
        </p>)) }
    </div>
  );
}
export default Filters;
