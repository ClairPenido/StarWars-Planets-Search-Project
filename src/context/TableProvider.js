import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import tableContext from './tableContext';

// terão acesso ao contexto global
export default function TableProvider({ children }) { // onde usar será o pai do componente
  const [data, setData] = useState([]);

  const getPlanets = () => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((response) => {
        const objResults = response.results;
        const filtro = objResults.map((res) => {
          delete res.residents;
          return res;
        });
        setData(filtro);
      });
  };
  useEffect(() => {
    getPlanets();
  }, []);
  return (
    <tableContext.Provider value={ { data } }>
      { children }
    </tableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
