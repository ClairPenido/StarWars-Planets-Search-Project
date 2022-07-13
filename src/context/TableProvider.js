/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import tableContext from './tableContext';

// irá prover o estado global
export default function TableProvider({ children }) { // onde usar será o pai do componente
  const [data, setData] = useState([]);
  const [inputName, setInputName] = useState([]);
  const [dataMutavel, setDataMutavel] = useState([]);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [inputNumber, setInputNumber] = useState([0]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const getPlanets = () => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((response) => {
        const objResults = response.results;
        const dadosNovos = objResults.map((res) => {
          delete res.residents;
          return res;
        });
        setData(dadosNovos);
        setDataMutavel(dadosNovos);
      });
  };
  const filterInput = () => {
    const filtroName = data.filter((e) => e.name.includes(inputName));
    setDataMutavel(filtroName);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  useEffect(() => {
    function optionFilters() {
      let teste = [...data];
      filterByNumericValues.forEach((filter) => {
        if (filter.comparisonFilter === 'maior que') {
          teste = teste
            .filter((e) => Number(e[filter.columnFilter]) > Number(filter.inputNumber));
        }
        if (filter.comparisonFilter === 'menor que') {
          teste = teste
            .filter((e) => Number(e[filter.columnFilter]) < Number(filter.inputNumber));
        }
        if (filter.comparisonFilter === 'igual a') {
          teste = teste
            .filter((e) => Number(e[filter.columnFilter])
            === Number(filter.inputNumber));
        }
      });
      setDataMutavel(teste);
    }
    optionFilters();
  }, [filterByNumericValues]);

  useEffect(() => {
    filterInput();
  }, [inputName]);
  return (
    <tableContext.Provider
      value={ { data: dataMutavel,
        inputName,
        setInputName,
        columnFilter,
        setColumnFilter,
        comparisonFilter,
        setComparisonFilter,
        inputNumber,
        setInputNumber,
        filterByNumericValues,
        setFilterByNumericValues } }
    >
      { children }
    </tableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
