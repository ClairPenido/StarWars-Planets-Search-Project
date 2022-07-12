import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import tableContext from './tableContext';

// irá prover estado global
export default function TableProvider({ children }) { // onde usar será o pai do componente
  const [data, setData] = useState([]);
  const [inputName, setInputName] = useState([]);
  const [dataMutavel, setDataMutavel] = useState([]);

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
    filterInput();
  }, [inputName]);
  return (
    <tableContext.Provider value={ { data: dataMutavel, inputName, setInputName } }>
      {/* // input:inputName */}
      { children }
    </tableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
