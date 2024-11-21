import ReactApexChart from "react-apexcharts";

const GaugeChart = ({ heading, series }) => {
  
  const getColor = (value) => {
    console.log(value, "--value");

    if (value < 40) {
      return "#FF0000";
    }
    if (value < 70) {
      return "#CCD000";
    }
    return "#32CD32";
  };

  const options = {
    chart: {
      type: "radialBar",
      offsetY: -20,
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        track: {
          background: "#E7E7E7",
          strokeWidth: "100%",
          margin: 20,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 15,
            fontSize: "62px",
            fontWeight: "600",
            color: "#343A40",
          },
        },
      },
    },
    fill: {
      colors: [getColor(series[0])],
    },
    labels: ["Average Results"],
  };

  return (
    <div>
      <h2>{heading}</h2>
      <ReactApexChart
        options={options}
        height={400}
        series={series}
        type="radialBar"
      />
    </div>
  );
};

export default GaugeChart;
