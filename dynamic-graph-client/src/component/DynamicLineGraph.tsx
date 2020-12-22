import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Chart from 'react-apexcharts';

const DynamicLineGraph = () => {

  const [optionCategories, setOptionCategories] = useState([1,2,3,4,5,6,7,8,9])
  const [seriesData, setSeriesData] = useState([1,2,3,4,5,6,7,8,9])
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: optionCategories
    },
    stroke: {
      curve: 'smooth'
    }
  }
  const series = [{
    name:"series-1",
    data: seriesData
  }]

  async function updateData() {
    console.log(seriesData);
    let seriesDataCache = seriesData.slice(1);
    await axios.get('http://localhost:8000/')
      .then((res) => {
        const newData = res.data;
        seriesDataCache.push(newData);
      })
    setSeriesData(seriesDataCache);
  }

  useEffect(() => {
    setTimeout(() => updateData(), 1000);
  });

  return (
    <div>
      <div className="row">
        <div className="mixed-chart">
          <Chart 
            options={options}
            series={series}
            type="line"
            width="500"
          />
        </div>
      </div>
    </div>
  );
}

export default DynamicLineGraph;