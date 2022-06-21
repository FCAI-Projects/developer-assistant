import React, { useEffect, useMemo, useState } from "react";
import { Toolbar } from "../components/Toolbar";
import { CustomSelect } from "../components/forms";
import { faker } from "@faker-js/faker";
import { FaCheck, FaClipboardList, FaDesktop, FaLayerGroup, FaRocket, FaUserPlus, FaUsers } from "react-icons/fa";
import { Card } from "../components/statistics/Card";
import { BarChart, DoughnutChart, LineChart, PieChart, RadarChart } from "../components/statistics/Chart";
import { useQuery } from "react-query";
import axios from "axios";
import { Loader } from "../components/Loader";
import { Table } from "../components/Table";

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

const lineOptions = {
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

const barOptions = {
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

export const Statistics: React.FC = () => {
  const [projectFilter, setProjectFilter] = useState<any>(null);
  const [paymentsData, setPaymentsData] = useState<[]>([]);
  const { data: statisticsNumbers, isLoading: numberLoading } = useQuery("Get Statistics Numbers", async () => {
    const { data } = await axios.get("/statistics/numbers");
    return data;
  });
  const { data: myProjects, isLoading: projectsLoading } = useQuery("Get My Projects", async () => {
    const { data } = await axios.get("/statistics/projects");
    return data;
  });
  const { data: tasks, isLoading: tasksLoading } = useQuery("Get Tasks Statistics", async () => {
    const { data } = await axios.get("/statistics/tasks");
    const result = {
      labels: ["UnDone", "Done"],
      datasets: [
        {
          label: "# of Votes",
          data: [data.undone, data.done],
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
          borderWidth: 1,
        },
      ],
    };
    return result;
  });
  const {
    data: lateTasks,
    isLoading: lateTasksLoading,
    refetch: lateTasksRefetch,
  } = useQuery("Get Late Tasks Statistics", async () => {
    if (!projectFilter) return;
    const { data } = await axios.get(`/statistics/tasks/late/${projectFilter.id}`);
    const result = {
      labels: ["Late", "Early"],
      datasets: [
        {
          label: "# of Votes",
          data: [data.late, data.early],
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
          borderWidth: 1,
        },
      ],
    };
    return result;
  });
  const {
    data: expenses,
    isLoading: expensesLoading,
    refetch: expensesRefetch,
  } = useQuery("Get Expenses", async () => {
    if (!projectFilter) return;
    const { data } = await axios.get(`/statistics/expenses/${projectFilter.id}`);
    const result = {
      labels: ["Pending", "Payment"],
      datasets: [
        {
          label: "# of Votes",
          data: [data.budget - data.paymentsTotal, data.paymentsTotal],
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
          borderWidth: 1,
        },
      ],
    };
    return result;
  });
  const { data: myTimeTracking, isLoading: timeTrackingLoading } = useQuery("Get My Time Tracking", async () => {
    const { data } = await axios.get("/statistics/timeTracking");

    const result = {
      labels: Object.keys(data),
      datasets: [
        {
          label: "# of Votes",
          data: Object.values(data),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };
    return result;
  });
  const {
    data: payments,
    isLoading: paymentsLoading,
    refetch: paymentsRefetch,
  } = useQuery("Get Project Payments", async () => {
    if (!projectFilter) return;
    const { data } = await axios.get(`/statistics/payments/${projectFilter.id}`);
    setPaymentsData(
      data.map((el: any) => ({
        id: (
          <a href={el.paymentUrl} target="blank" className="font-medium text-blue-700 underline hover:text-blue-900">
            {el._id}
          </a>
        ),
        amount: el.amount,
        status: el.status,
        paymentDate: el.paymentDate ? new Date(el.paymentDate).toDateString() : "",
        createdAt: new Date(el.createdAt).toDateString(),
      }))
    );
    const labels = data.map((el: any) => new Date(el.createdAt).toLocaleDateString());

    const result = {
      labels,
      datasets: [
        {
          label: "Payments",
          data: data.map((el: any) => el.amount),
          backgroundColor: "rgba(57, 189, 104, 0.5)",
        },
      ],
    };
    return result;
  });

  const paymentColumn = useMemo(
    () => [
      {
        header: "#",
        accessor: "id",
      },
      {
        header: "Amount",
        accessor: "amount",
      },
      {
        header: "Status",
        accessor: "status",
      },
      {
        header: "Payment Date",
        accessor: "paymentDate",
      },
      {
        header: "Created At",
        accessor: "createdAt",
      },
    ],
    []
  );

  useEffect(() => {
    if (myProjects) {
      setProjectFilter({ id: myProjects[0]._id, name: myProjects[0].name });
    }
  }, [myProjects]);

  useEffect(() => {
    if (projectFilter) {
      expensesRefetch();
      paymentsRefetch();
      lateTasksRefetch();
    }
  }, [projectFilter]);

  if (
    numberLoading ||
    projectsLoading ||
    tasksLoading ||
    expensesLoading ||
    !expenses ||
    timeTrackingLoading ||
    paymentsLoading ||
    !payments ||
    lateTasksLoading
  ) {
    return (
      <div className="flex justify-center py-10">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Toolbar logoutButton={true} />
      <div className="container mx-auto text-slate-700">
        <div className="px-5 py-3">
          <div className="mb-5 flex items-center gap-5">
            <Card value={statisticsNumbers.projects} title={"Projects"} icon={<FaLayerGroup />} />
            <Card value={statisticsNumbers.members} title={"Member In"} icon={<FaUserPlus />} />
            <Card value={statisticsNumbers.tasks} title={"Tasks"} icon={<FaClipboardList />} />
            <Card value={statisticsNumbers.done} title={"Done Tasks"} icon={<FaCheck />} />
          </div>
          <header className="flex justify-between pb-5">
            <div className="ml-auto flex items-center gap-2">
              Project:
              <CustomSelect
                value={projectFilter}
                options={myProjects.map((project: any) => ({ id: project._id, name: project.name }))}
                label="name"
                id="id"
                onChange={(value) => setProjectFilter(value)}
              />
            </div>
          </header>
          <div className="flex flex-col gap-10">
            <div className="flex items-start gap-10">
              <DoughnutChart data={tasks} title="My Tasks" />
              <DoughnutChart data={expenses} title="Project Payments" />
              <PieChart data={lateTasks} title="Late Tasks" />
              <RadarChart data={myTimeTracking} title="Projects Time Tracking" />
            </div>
            <div className="flex items-start gap-10">
              {/* <LineChart data={expenses} options={lineOptions} title="title" /> */}
              <BarChart data={payments} options={barOptions} title="Payment Milestones" />
              <div>
                <h4 className="mb-2 text-xl">
                  Payments Of <span className="font-medium">{projectFilter.name}</span>
                </h4>
                <Table columns={paymentColumn} data={paymentsData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
