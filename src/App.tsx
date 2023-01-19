import React from 'react';
import VendingMachine from './components/Vending';

function App() {

  return (
    <div className="App">
      <h3 className='text-center'>Для выбора товара нажмите на него</h3>
      <VendingMachine></VendingMachine>
    </div>
  );
}

export default App;
