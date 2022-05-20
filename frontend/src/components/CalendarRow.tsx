import { useState } from "react";

export interface CalendarRowProps {
  firstDay: number;
  lastDayInMonth: number;
  row: number;
  currentMonth: number;
  currentYear: number;
  tasks: any;
}

export const CalendarRow: React.FC<CalendarRowProps> = ({
  firstDay,
  lastDayInMonth,
  row,
  currentMonth,
  currentYear,
  tasks,
}) => {
  const activeDay = useState(new Date().getDate())[0];

  const printTasks = (i: number) => {
    // console.log(tasks);
    return tasks
      .filter(
        (task: any) =>
          new Date(task.deadline).getDate() === i &&
          new Date(task.deadline).getMonth() === currentMonth &&
          new Date(task.deadline).getFullYear() === currentYear
      )
      .map((el: any) => (
        <span key={el.id} className="my-1 block rounded-lg bg-slate-700 p-0.5 text-sm text-white">
          {el.name}
        </span>
      ));
  };

  let content = [];
  //first row with empty spaces
  if (!row) {
    for (let i = 0; i < firstDay; i++) {
      content.push(<td></td>);
    }
    content.push(
      <td className="relative h-40 border px-2 text-center text-gray-800 hover:text-blue-500 md:px-3">1</td>
    );
    let len = 7 - content.length;
    for (let i = 1; i <= len; i++) {
      content.push(
        <>
          {activeDay === i + 1 && new Date().getMonth() === currentMonth && new Date().getFullYear() === currentYear ? (
            <td className="relative h-40 border px-2 text-center  text-gray-800 hover:text-blue-500 md:px-3">
              <span className="rounded-full bg-blue-500 px-2.5 py-2 text-white">{i + 1}</span>
              {printTasks(i + 1)}
            </td>
          ) : (
            <td className="relative h-40 border px-2  text-center text-gray-800 hover:text-blue-500 md:px-3">
              {i + 1}
              {printTasks(i + 1)}
            </td>
          )}
        </>
      );
    }

    return <>{content}</>;
  }
  //other rows
  for (let i = 1; i <= 7; i++) {
    if (i + (7 * row - firstDay) <= lastDayInMonth) {
      content.push(
        <>
          {activeDay === i + (7 * row - firstDay) &&
          new Date().getMonth() === currentMonth &&
          new Date().getFullYear() === currentYear ? (
            <td className="relative h-40 border px-2 text-center  text-gray-800 hover:text-blue-500 md:px-3">
              <span className="rounded-full bg-blue-500 px-2.5 py-2 text-white">{i + (7 * row - firstDay)}</span>
              {printTasks(i + (7 * row - firstDay))}
            </td>
          ) : (
            <td className="relative h-40 border px-2 text-center  text-gray-800 hover:text-blue-500 md:px-3">
              {i + (7 * row - firstDay)}
              {printTasks(i + (7 * row - firstDay))}
            </td>
          )}
        </>
      );
    }
  }
  return <>{content}</>;
};
