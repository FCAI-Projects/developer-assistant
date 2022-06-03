import { useMutation } from "@apollo/client";
import React, { useMemo } from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { AddNewExpense } from "../../components/modals/AddNewExpenseModal";
import { Table } from "../../components/Table";
import { ExpensesDocument, RemoveExpenseDocument,  useExpensesQuery } from "../../graphql/generated/graphql";

export const ProjectExpenses: React.FC = () => {
  const projectId = useParams();
   const {data} = useExpensesQuery({variables: {project: projectId.id as string}});
  const [deleteExpense, { loading }] = useMutation(RemoveExpenseDocument, { refetchQueries: [{ query: RemoveExpenseDocument, variables: { project: projectId.id } }] });
  console.log(data);
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
  // data = useMemo(
  //   () => [
  //     {
  //       id: 1,
  //       name: "Expense 1",
  //       amount: "100",
  //       date: "2020-01-01",
  //       actions: (
  //         <Button lightRed onClick={() => {}}>
  //           <FaTrashAlt />
  //         </Button>
  //       ),
  //     }
  //   ],
  //   []
  // );

  return (
    <div>
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Expenses</h2>
        <AddNewExpense />
      </header>
      <div className="py-3">
        {/* <Table columns={column} data={data} /> */}
      </div>
    </div>
  );
};
    