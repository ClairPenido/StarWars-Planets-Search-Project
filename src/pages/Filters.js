/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import tableContext from '../context/tableContext';
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
  // const [clickSubmit, setClickSubmit] = useState(false);
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
  }, [arrayOptions]);

  const clickRemoveFilters = (() => {
    setArrayOptions(INITIAL_COLUMN_OPTIONS);
    setFilterByNumericValues([]);
  });

  return (
    <div>
      <h3>Filtros</h3>
      <input
        data-testid="name-filter"
        name="filter name"
        type="text"
        value={ inputName }
        onChange={ (e) => setInputName(e.target.value) }
      />
      <p />
      <fieldset>
        <legend>Filtros de Conteúdo</legend>
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
            {arrayOptions.map((op, index) => (
              <option key={ index } value={ op }>{ op }</option>)) }
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
          onClick={ clickSubmitButton }
        >
          Filtrar
        </button>
      </fieldset>
      {filterByNumericValues.map((elem, index) => (
        <>
          <p key={ index } data-testid="filter">
            <span value={ columnFilter }>{ elem.columnFilter }</span>
            {' '}
            <span value={ comparisonFilter }>{ elem.comparisonFilter }</span>
            {' '}
            <span value={ inputNumber }>{ elem.inputNumber }</span>
            {' '}
            <button
              type="submit"
              // onClick={ clickRemoverFiltro }
            >
              X
            </button>
          </p>
          <button
            data-testid="button-remove-filters"
            type="submit"
            onClick={ clickRemoveFilters }
          >
            Remover todas filtragens
          </button>
        </>)) }
    </div>
  );
}
export default Filters;
