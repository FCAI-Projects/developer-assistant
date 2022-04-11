import React from "react";
import { useTable } from "react-table";

interface columnsInterface {
  Header: string;
  accessor: string;
}

export interface TableProps extends React.TableHTMLAttributes<HTMLElement> {
  className?: string;
  data: object[];
  columns: columnsInterface[];
}

export const Table: React.FC<TableProps> = ({ className, data, columns }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className="relative overflow-x-auto">
      <table className={`${className} w-full text-left text-sm text-gray-500 dark:text-gray-400`} {...getTableProps()}>
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="px-6 py-3">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="px-6 py-4">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
