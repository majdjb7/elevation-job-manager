import React from 'react';
import Chart from "react-apexcharts";
import { toJS } from 'mobx'

export default function PieChart(props) {
    const labels = Object.keys(props.stats)
    const series = Object.values(props.stats)
    const options = { labels };
    // console.log(toJS(props.stats))
  return (
    <div className="donut">
        <h1 width="380px">{props.name}</h1>
        <Chart name="H1" options={options} series={series} type="pie" width="380" />
    </div>
  )
}

  