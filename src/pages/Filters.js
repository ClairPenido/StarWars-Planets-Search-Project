import React, { useContext } from 'react';
import tableContext from '../context/tableContext';

function Filters() {
  const { inputName, setInputName } = useContext(tableContext);

  return (
    <div>
      <h3>Filtros</h3>
      <input
        data-testid="name-filter"
        id="name-filter"
        name="filter name"
        type="text"
        value={ inputName }
        onChange={ (e) => setInputName(e.target.value) }
      />
    </div>
  );
}
export default Filters;
