import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useMemo, useState } from "react";

const BellCurveGraph = ({ allGrades = [], userGrade = "" }) => {
  const [hovered, setHovered] = useState(false);
  const [hoveredDot, setHoveredDot] = useState(false);

  const graphData = useMemo(() => {
    const userGradeNumber = Number(userGrade);
    if (userGradeNumber === 0) {
      return null;
    }

    const validGrades = [
      ...allGrades.map(Number).filter((g) => !isNaN(g)),
      userGradeNumber,
    ];

    if (!validGrades.length || isNaN(userGradeNumber)) {
      return null;
    }
    const mean =
      validGrades.reduce((sum, grade) => sum + grade, 0) / validGrades.length;
    const variance =
      validGrades.reduce((sum, grade) => sum + Math.pow(grade - mean, 2), 0) /
      validGrades.length;
    const stdDev = Math.sqrt(variance);

    if (stdDev === 0) {
      return null;
    }

    const zScore = (userGradeNumber - mean) / stdDev;
    const xPosition = mean + zScore * stdDev;

    const percentile = normalCDF(zScore) * 100;
    const betterThanUsers =
      (validGrades.filter((grade) => grade < userGradeNumber).length /
        validGrades.length) *
      100;

    const points = [];
    const min = mean - 4 * stdDev;
    const max = mean + 4 * stdDev;

    for (let x = min; x <= max; x += stdDev / 10) {
      points.push([x, normalPDF(x, mean, stdDev)]);
    }

    const userGradeY = normalPDF(userGradeNumber, mean, stdDev);

    return {
      points,
      mean,
      stdDev,
      userGradeNumber,
      zScore,
      percentile,
      betterThanUsers,
      userGradeY,
      min,
      max,
      xPosition,
    };
  }, [allGrades, userGrade]);

  if (!graphData) {
    return <div>Unable to generate bell curve due to insufficient data.</div>;
  }

  const options = {
    chart: {
      type: "areaspline",
      events: {
        mouseOver: () => {
          setHovered(true);
        },
        mouseOut: () => {
          setHovered(false);
        },
      },
    },
    title: {
      text: "Percentile Distribution Bell Curve",
    },
    xAxis: {
      title: { text: "Grade" },
      min: graphData?.min,
      max: graphData?.max,
      plotLines: [
        ...(hoveredDot
          ? [
              {
                color: "red",
                width: 3,
                value: graphData?.xPosition,
                dashStyle: "Dash",
                label: {
                  text: `Percentile: ${graphData?.percentile?.toFixed(2)}%`,
                  align: "center",
                  verticalAlign: "middle",
                  style: { color: "red", fontWeight: "bold" },
                },
              },
            ]
          : []),
      ],
    },
    yAxis: {
      title: { text: "Density" },
    },
    series: [
      {
        name: "Grade Distribution",
        data: graphData?.points,
        marker: { enabled: false },
        zones: [
          {
            value: 50,
            color: "#1e90ff",
            fillColor: "rgba(30, 144, 255, 0.3)",
          },
          {
            value: 100,
            color: "#32cd32",
            fillColor: "rgba(50, 205, 50, 0.3)",
          },
          {
            color: "#ff4500",
            fillColor: "rgba(255, 69, 0, 0.3)",
          },
        ],
        tooltip: {
          pointFormat: "Density: {point.y:.4f}",
        },
      },

      {
        name: "User Grade",
        type: "scatter",
        data: [[graphData?.userGradeNumber, graphData?.userGradeY]],
        marker: {
          symbol: "circle",
          radius: 6,
          fillColor: "red",
        },
        tooltip: {
          pointFormat: `User Grade: {point.x:.2f}<br>Density: {point.y:.4f}`,
        },
        events: {
          mouseOver: () => {
            setHoveredDot(true);
          },
          mouseOut: () => {
            setHoveredDot(false);
          },
        },
      },
    ],
    tooltip: {
      enabled: false,
      headerFormat: "",
      pointFormat: "Grade: {point.x:.2f}<br>Density: {point.y:.4f}",
    },
  };

  return (
    <div className="w-full max-w-4xl p-4">
      <div className="p-4 mb-4 bg-gray-100 rounded">
        <p>
          You are better than {graphData?.betterThanUsers?.toFixed(2)}% of the
          class
        </p>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

function normalPDF(x, mean, stdDev) {
  return (
    (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
    Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2))
  );
}

function normalCDF(z) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804 * Math.exp((-z * z) / 2);
  const prob =
    d *
    t *
    (0.31938153 +
      t *
        (-0.356563782 +
          t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z > 0 ? 1 - prob : prob;
}

export default BellCurveGraph;
