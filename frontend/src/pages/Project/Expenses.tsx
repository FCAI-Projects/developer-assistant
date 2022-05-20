import React, { useMemo } from "react";
import { FaEdit, FaPlus, FaTrash, FaTrashAlt } from "react-icons/fa";
import { Button } from "../../components/Button";
import { AddNewExpense } from "../../components/modals/AddNewExpenseModal";
import { NewRoleModel } from "../../components/modals/NewRoleModel";
import { Table } from "../../components/Table";

export const ProjectExpenses: React.FC = () => {
  const column = useMemo(
    () => [
      {
        header: "#",
        accessor: "id",
      },
      {
        header: "Name",
        accessor: "name",
      },
      {
        header: "Amount",
        accessor: "amount",
      },
      {
        header: "Date",
        accessor: "date",
      },
      {
        header: "",
        accessor: "actions",
      },
    ],
    []
  );
  const data = useMemo(
    () => [
      {
        id: 1,
        name: "Expense 1",
        amount: "100",
        date: "2020-01-01",
        actions: (
          <Button lightRed onClick={() => {}}>
            <FaTrashAlt />
          </Button>
        ),
      },
      {
        id: 2,
        name: "Expense 2",
        amount: "200",
        date: "2020-01-01",
        actions: (
          <Button lightRed onClick={() => {}}>
            <FaTrashAlt />
          </Button>
        ),
      },
      {
        id: 3,
        name: "Expense 3",
        amount: "300",
        date: "2020-01-01",
        actions: (
          <Button lightRed onClick={() => {}}>
            <FaTrashAlt />
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Expenses</h2>
        <AddNewExpense />
      </header>
      <div className="py-3">
        <Table columns={column} data={data} />
      </div>
    </div>
  );
};
