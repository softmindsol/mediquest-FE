import ReactApexChart from "react-apexcharts";

const GaugeChart = ({ heading, series }) => {
  // Function to determine the color based on the series percentage
  const getColor = (value) => {
    if (value < 40) return "#FF0000"; // Red for values below 40%
    if (value < 70) return "#CCD000"; // Orange for values between 40% and 70%
    return "#32CD32"; // Green for values 70% and above
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
          strokeWidth: "%",
          margin: 20,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 2,
            opacity: 0.5,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 15,
            fontSize: "62px",
            fontWeight: "600", // Corrected font weight
            color: "#343A40", // Optional: set color for better visibility
          },
        },
      },
    },
    fill: {
      colors: [getColor(series[0])], // Use the color based on the series value
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
