import React from 'react';
import './app.css';
import TableProvider from './context/TableProvider';
import Filters from './pages/Filters';
import Table from './pages/Table';

function App() {
  return (
    <TableProvider>
      <Filters />
      <Table />
    </TableProvider>
  );
}

export default App;
