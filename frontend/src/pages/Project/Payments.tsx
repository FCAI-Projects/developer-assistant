import { useMutation } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { AddNewExpense } from "../../components/modals/AddNewExpenseModal";
import { AddPaymentModel } from "../../components/modals/AddPaymentModel";
import { Table } from "../../components/Table";
import { ExpensesDocument, RemoveExpenseDocument, useExpensesQuery, useFindPaymentsQuery } from "../../graphql/generated/graphql";

export const ProjectPayments: React.FC = () => {
  const paramas = useParams();
  const [data, setData] = useState<any>([]);
  const { data: payments } = useFindPaymentsQuery({ variables: { project: paramas.id as string } });

  const column = useMemo(
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
      }
    ],
    []
  );

  useEffect(() => {
    if (payments)
      setData(
        payments.findPayments.map((el: any) => ({
          id: (
          <a 
            href={el.paymentUrl} 
            target="blank"
            className="text-blue-700 font-medium underline hover:text-blue-900"
          >
            {el.id}
          </a>
          ),
          amount: el.amount,
          status: el.status,
          paymentDate: el.paymentDate ? new Date(el.paymentDate).toDateString() : "",
          createdAt: new Date(el.createdAt).toDateString(),          
        }))
      );
  }, [payments]);

  return (
    <div>
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Payments</h2>
        <AddPaymentModel />
      </header>
      <div className="py-3">
        <Table columns={column} data={data} />
      </div>
    </div>
  );
};

