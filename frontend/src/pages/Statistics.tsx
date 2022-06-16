import React, { useState } from "react";
import { Toolbar } from "../components/Toolbar";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
} from "chart.js";
import { Doughnut, Radar, Pie, Line, Bar } from "react-chartjs-2";
import { CustomSelect } from "../components/forms";
import { faker } from "@faker-js/faker";

ChartJS.register(
  ArcElement,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  CategoryScale,
  LinearScale,
  Title,
  BarElement
);

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const data2 = {
  labels: ["Thing 1", "Thing 2", "Thing 3", "Thing 4", "Thing 5", "Thing 6"],
  datasets: [
    {
      label: "# of Votes",
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const data3 = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const options4 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
};

const labels4 = ["January", "February", "March", "April", "May", "June", "July"];

const data4 = {
  labels4,
  datasets: [
    {
      label: "Dataset 1",
      data: labels4.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels4.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const options5 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels5 = ["January", "February", "March", "April", "May", "June", "July"];

export const data5 = {
  labels5,
  datasets: [
    {
      label: "Dataset 1",
      data: labels5.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels5.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const Statistics: React.FC = () => {
  const [projectFilter, setProjectFilter] = useState({ id: "1", label: "Project 1" });

  return (
    <div>
      <Toolbar logoutButton={true} />
      <div className="px-5 py-3">
        <header className="flex justify-between pb-5">
          <h2 className="text-2xl font-medium">Statistics</h2>
          <div className="flex items-center gap-2">
            Project:
            <CustomSelect
              value={projectFilter}
              options={[
                { id: "1", label: "Project 1" },
                { id: "2", label: "Project 2" },
              ]}
              label="label"
              id="id"
              onChange={(value) => setProjectFilter(value)}
            />
          </div>
        </header>
        <div className="flex flex-col gap-10">
          <div className="flex items-start gap-10">
            <div className="flex flex-1 flex-col items-center gap-4 rounded-lg py-3 px-5 shadow">
              <Doughnut data={data} className="w-full" />
              <span className="">Chat Title</span>
            </div>
            <div className="flex flex-1 flex-col items-center gap-4 rounded-lg py-3 px-5 shadow">
              <Pie data={data3} className="w-full" />
              <span className="">Chat Title</span>
            </div>
            <div className="flex flex-1 flex-col items-center gap-4 rounded-lg py-3 px-5 shadow">
              <Radar data={data2} className="w-full" />
              <span className="">Chat Title</span>
            </div>
          </div>
          <div className="flex items-start gap-10">
            <div className="flex flex-1 flex-col items-center gap-4 rounded-lg py-3 px-5 shadow">
              <Line options={options4} data={data4} className="w-full" />
              <span className="">Chat Title</span>
            </div>
            <div className="flex flex-1 flex-col items-center gap-4 rounded-lg py-3 px-5 shadow">
              <Bar options={options5} data={data5} className="w-full" />
              <span className="">Chat Title</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
