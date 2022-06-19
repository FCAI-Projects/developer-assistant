import { useMutation } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { AddNewExpense } from "../../components/modals/AddNewExpenseModal";
import { Table } from "../../components/Table";
import { ExpensesDocument, RemoveExpenseDocument, useExpensesQuery } from "../../graphql/generated/graphql";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const ProjectExpenses: React.FC = () => {
  const paramas = useParams();
  const [data, setData] = useState<any>([]);
  const { data: expenses, refetch } = useExpensesQuery({ variables: { project: paramas.id as string } });
  const [deleteExpense, { loading }] = useMutation(RemoveExpenseDocument);
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

  const handleDelete = async (id: string) => {
    try {
      await deleteExpense({
        variables: {
          removeExpenseId: id,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (expenses)
      setData(
        expenses.expenses.map((el: any) => ({
          id: el.id,
          name: el.name,
          amount: el.amount,
          date: new Date(el.date).toDateString(),
          actions: (
            <Button 
              lightRed 
              onClick={() => {
                try {
                  Swal.fire({
                    title: 'Are you sure delete Expenses ?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it !'
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      await handleDelete(el.id);
                      Swal.fire(
                        'Deleted!',
                        'Expenses has been deleted.',
                        'success'
                      )
                    }
                  })
                } catch (error: any) {
                  toast.error(error.message);
                }
              }}
            >
              <FaTrashAlt />
            </Button>
          ),
        }))
      );
  }, [expenses]);

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
