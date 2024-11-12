import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const normalDistribution = (x) => {
  return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-(x * x) / 2);
};

const BellCurve = ({ userScore = 0 }) => {
  const generateData = () => {
    const data = [];
    for (let x = -4; x <= 4; x += 0.1) {
      const y = normalDistribution(x);
      data.push([x, y]);
    }
    return data;
  };

  const bellCurveData = generateData();

  const zones = [
    { x: -3, percentage: "0.1%" },
    { x: -2, percentage: "2.1%" },
    { x: -1, percentage: "13.6%" },
    { x: 0, percentage: "34.1%" },
    { x: 1, percentage: "13.6%" },
    { x: 2, percentage: "2.1%" },
    { x: 3, percentage: "0.1%" },
  ];

  const options = {
    chart: {
      type: "area",
      zoomType: "x",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    xAxis: {
      min: -4,
      max: 4,
      tickPositions: [-3, -2, -1, 0, 1, 2, 3],
      plotLines: [
        {
          color: "red",
          dashStyle: "solid",
          value: userScore,
          width: 2,
          zIndex: 5,
        },
      ],
      gridLineWidth: 1,
      gridLineDashStyle: "Solid",
      gridLineColor: "#E0E0E0",
      minPadding: 0.02,
      maxPadding: 0.02,
      endOnTick: false,
      startOnTick: false,
      labels: {
        formatter: function () {
          const zone = zones.find((zone) => zone.x === this.value);
          return zone ? `${this.value}σ<br/>${zone.percentage}` : null;
        },
        style: {
          color: "#414E79",
          fontSize: "12px",
          textAlign: "center",
        },
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        enabled: false,
      },
      gridLineWidth: 0,
    },
    tooltip: {
      headerFormat: "",
      pointFormat:
        "Standard Deviation: {point.x:.2f}σ<br>Density: {point.y:.4f}",
    },

    plotOptions: {
      area: {
        marker: {
          enabled: false,
        },
        zones: [
          { value: -3, color: "#E2E4EC" },
          { value: -2, color: "#B6BED4" },
          { value: -1, color: "#62719C" },
          { value: 0, color: "#414E79" },
          { value: 1, color: "#414E79" },
          { value: 2, color: "#62719C" },
          { value: 3, color: "#B6BED4" },
          { value: 4, color: "#E2E4EC" },
        ],
        zoneAxis: "x",
      },
    },
    annotations: [
      {
        labels: zones.map((zone) => ({
          point: { x: zone.x, y: 0.05 }, // Adjust this `y` value to position the percentage label in the grid
          text: zone.percentage,
          style: {
            color: "#414E79",
            fontSize: "12px",
            fontWeight: "bold", // Optional: Make text bold
          },
        })),
      },
    ],
    series: [
      {
        name: "Normal Distribution",
        data: bellCurveData,
        color: "#414E79",
        fillOpacity: 0.8,
        lineWidth: 1,
        zIndex: 1,
      },
      {
        type: "scatter",
        name: "Your Score",
        data: [[userScore, normalDistribution(userScore)]],
        color: "red",
        marker: {
          radius: 6,
          symbol: "circle",
        },
        zIndex: 2,
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl p-4 mx-auto">
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default BellCurve;
