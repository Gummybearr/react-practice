import React from 'react';
import logo from './logo.svg';
import './App.css';

import BarChart from './component/BarChart';
import LineChart from './component/LineChart';
import PieChart from './component/PieChart';

function App() {
  return (
    <div className="App">
      <BarChart/>
      <LineChart/>
      <PieChart/>
    </div>
  );
}

export default App;
