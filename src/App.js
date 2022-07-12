import React from 'react';
import './App.css';
import TableProvider from './context/TableProvider';
import Filters from './pages/Filters';
import Table from './pages/Table';

function App() {
  return (
    <TableProvider>
      <span>Projeto Star Wars - Trybe</span>
      <Filters />
      <Table />
    </TableProvider>
  );
}

export default App;
