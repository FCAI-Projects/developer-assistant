import React from "react";
import { useTable } from "react-table";

interface columnsInterface {
  header: string;
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
      <table className={`${className} w-full text-left text-sm text-gray-500`} {...getTableProps()}>
        <thead className="border-b bg-slate-700 px-1 text-xs uppercase text-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="px-6 py-3">
                  {column.render("header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-b bg-white">
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
