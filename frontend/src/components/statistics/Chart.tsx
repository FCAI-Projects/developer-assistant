import React from "react";
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
import { FaUsers } from "react-icons/fa";

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

interface Props {
  data: any;
  title: string;
  className?: string;
  options?: any;
}

const BaseChart: React.FC = ({ children }) => {
  return (
    <div className="flex flex-1 flex-col items-center gap-4 rounded-lg border bg-white py-3 px-5 shadow-inner">
      {children}
    </div>
  );
};

export const DoughnutChart: React.FC<Props> = ({ title, data, options, className }) => {
  return (
    <BaseChart>
      <Doughnut data={data} className="w-full" />
      <span className="">{title}</span>
    </BaseChart>
  );
};

export const PieChart: React.FC<Props> = ({ title, data, options, className }) => {
  return (
    <BaseChart>
      <Pie data={data} className="w-full" />
      <span className="">{title}</span>
    </BaseChart>
  );
};

export const RadarChart: React.FC<Props> = ({ title, data, options, className }) => {
  return (
    <BaseChart>
      <Radar data={data} className="w-full" />
      <span className="">{title}</span>
    </BaseChart>
  );
};

export const LineChart: React.FC<Props> = ({ title, data, options, className }) => {
  return (
    <BaseChart>
      <Line options={options} data={data} className="w-full" />
      <span className="">{title}</span>
    </BaseChart>
  );
};

export const BarChart: React.FC<Props> = ({ title, data, options, className }) => {
  return (
    <BaseChart>
      <Bar options={options} data={data} className="w-full" />
      <span className="">{title}</span>
    </BaseChart>
  );
};
