import { useMutation } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { AddNewExpense } from "../../components/modals/AddNewExpenseModal";
import { Table } from "../../components/Table";
import { ExpensesDocument, RemoveExpenseDocument, useExpensesQuery } from "../../graphql/generated/graphql";

export const ProjectPayments: React.FC = () => {
  const paramas = useParams();
  const [data, setData] = useState<any>([]);
  const { data: expenses, refetch } = useExpensesQuery({ variables: { project: paramas.id as string } });

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

  useEffect(() => {
    if (expenses)
      setData(
        expenses.expenses.map((el: any) => ({
          id: el.id,
          name: el.name,
          amount: el.amount,
          date: new Date(el.date).toDateString(),
          actions: (
            <Button lightRed>
              <FaTrashAlt />
            </Button>
          ),
        }))
      );
  }, [expenses]);

  return (
    <div>
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Payments</h2>
        <AddNewExpense />
      </header>
      <div className="py-3">
        <Table columns={column} data={data} />
      </div>
    </div>
  );
};
