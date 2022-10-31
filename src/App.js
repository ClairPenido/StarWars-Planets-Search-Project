import React from 'react';
import './app.css';
import TableProvider from './context/TableProvider';
import Filters from './pages/Filters';
import Table from './pages/Table';

function App() {
  return (
    <TableProvider>
      <h1>Projeto Star Wars - Trybe</h1>
      <Filters />
      <Table />
    </TableProvider>
  );
}

export default App;
