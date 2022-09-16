import React from "react";
import { useAppSelector } from "../app/hooks";
import { Line } from "react-chartjs-2";
// import { Col, Row, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface GraphProps {}

// const data = {
//   labels: labels,
//   datasets: [
//     {
//       label: "First dataset",
//       data: [33, 53, 85, 41, 44, 65],
//       fill: true,
//       backgroundColor: "rgba(75,192,192,0.2)",
//       borderColor: "rgba(75,192,192,1)",
//     },
//     {
//       label: "Second dataset",
//       data: [33, 25, 35, 51, 54, 76],
//       fill: false,
//       borderColor: "#742774",
//     },
//   ],
// };

export const Graph: React.FC<GraphProps> = ({}) => {
  const { errorCount, adjustedSpeed, grossWpm } = useAppSelector(
    (state) => state.result
  );

  const labels = grossWpm.map((_, idx: number) => idx + 1);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Adjusted Speed",
        data: adjustedSpeed,
        borderColor: "#6b6b77",
        backgroundColor: "rgb(107, 107, 119, 0.3)",
        tension: 0.2,
        fill: true,
      },
      {
        label: "Gross WPM",
        data: grossWpm,
        borderColor: "rgb(172, 172, 189)",
        backgroundColor: "rgb(107, 107, 119, 0.1)",
        tension: 0.2,
        fill: true,
      },
      {
        label: "Errors",
        data: errorCount,
        borderColor: "rgb(255, 92, 92)",
        backgroundColor: "rgb(255, 92, 92)",
        tension: 0.2,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Value",
        },
        suggestedMin: -10,
        suggestedMax: 200,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      title: {
        display: true,
        text: (ctx: any) => {
          return "Mode: average, intersect: xy";
        },
      },
    },
  };

  console.log(grossWpm);
  return (
    <div className="result-graph">
      <Line
        data={data}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: false,
              },
            },
            y: {
              display: true,
              title: {
                display: false,
              },
              suggestedMin: 0,
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          plugins: {
            title: {
              display: false,
              text: "Mode: average, intersect: xy",
            },
            filler: {
              propagate: true,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};
