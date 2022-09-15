import React from "react";
import { useAppSelector } from "../app/hooks";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

interface GraphProps {}

const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774"
      }
    ]
  };

export const Graph: React.FC<GraphProps> = ({}) => {
  const { adjustedSpeed, grossWpm } = useAppSelector((state) => state.result);
//   const labels = grossWpm.map((_, idx: number) => idx);

//   const data = {
//         labels: labels,
//         datasets: [{
//           label: 'My First dataset',
//           data: grossWpm,
//         }]
//    };

  return (
    <div className="result-graph">
      <Line data={data} />
    </div>
  );
};
