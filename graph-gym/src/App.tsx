import React from 'react';
import logo from './logo.svg';
import './App.css';

import BarChart from './component/BarChart';
import LineChart from './component/LineChart';

function App() {
  return (
    <div className="App">
      <BarChart/>
      <LineChart/>
    </div>
  );
}

export default App;
