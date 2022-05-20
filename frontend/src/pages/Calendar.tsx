import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CalendarRow } from "../components/CalendarRow";

export interface CalendarProps {}

export const Calendar: React.FC<CalendarProps> = () => {
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [activeMonthString, setActiveMonthString] = useState(new Date().toDateString().split(" ")[1]);
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  const prevMonth = useRef<number>(null);
  const [firstDayInMonth, setFirstDayInMonth] = useState<number[]>([]);
  const [tasks, _] = useState([
    {
      id: 1,
      name: "Task 1",
      deadline: new Date(2022, 4, 25).toISOString(),
    },
    {
      id: 2,
      name: "Task 2",
      deadline: new Date(2022, 4, 25).toISOString(),
    },
    {
      id: 3,
      name: "Task 3",
      deadline: new Date(2022, 4, 27).toISOString(),
    },
    {
      id: 4,
      name: "Task 4",
      deadline: new Date(2022, 4, 29).toISOString(),
    },
    {
      id: 5,
      name: "Task 5",
      deadline: new Date(2022, 4, 30).toISOString(),
    },
    {
      id: 6,
      name: "Task 6",
      deadline: new Date(2022, 5, 1).toISOString(),
    },
    {
      id: 7,
      name: "Task 7",
      deadline: new Date(2022, 5, 5).toISOString(),
    },
    {
      id: 8,
      name: "Task 8",
      deadline: new Date(2022, 5, 27).toISOString(),
    },
  ]);

  useEffect(() => {
    let x = [];
    for (let i = 1; i <= 12; i++) {
      x.push(new Date(`${activeYear}/${i}/1`).getDay());
    }
    setFirstDayInMonth(x);
  }, [activeYear]);

  useEffect(() => {
    setActiveMonthString(new Date(new Date().setMonth(activeMonth)).toDateString().split(" ")[1]);
    //remember previous activeMonth
    //@ts-ignore
    prevMonth.current = activeMonth;
  }, [activeMonth]);

  return (
    <div className="m-5 min-h-screen rounded-lg border bg-white p-5">
      <div className="w-full">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-left text-xl font-bold text-slate-800">{`${activeMonthString} ${activeYear}`}</div>
          <div className="flex space-x-4">
            <button
              className="rounded bg-blue-600 p-2 text-xs text-white"
              onClick={() => {
                if (prevMonth.current === 0) {
                  setActiveYear(activeYear - 1);
                  setActiveMonth(11);
                } else {
                  setActiveMonth(activeMonth - 1);
                }
              }}
            >
              <FaChevronLeft />
            </button>
            <button
              className="rounded bg-blue-600 p-2 text-xs text-white"
              onClick={() => {
                if (prevMonth.current === 11) {
                  setActiveYear(activeYear + 1);
                  setActiveMonth(0);
                } else {
                  setActiveMonth(activeMonth + 1);
                }
              }}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
        <div className="">
          <table className="h-full w-full">
            <thead>
              <tr>
                <th className="border py-3 px-2">SUN</th>
                <th className="border py-3 px-2">MON</th>
                <th className="border py-3 px-2">TUE</th>
                <th className="border py-3 px-2">WEN</th>
                <th className="border py-3 px-2">THU</th>
                <th className="border py-3 px-2">FRI</th>
                <th className="border py-3 px-2">SAT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <CalendarRow
                  firstDay={firstDayInMonth[activeMonth]}
                  lastDayInMonth={new Date(activeYear, activeMonth + 1, 0).getDate()}
                  row={0}
                  currentMonth={activeMonth}
                  currentYear={activeYear}
                  tasks={tasks}
                />
              </tr>
              <tr>
                <CalendarRow
                  firstDay={firstDayInMonth[activeMonth]}
                  lastDayInMonth={new Date(activeYear, activeMonth + 1, 0).getDate()}
                  row={1}
                  currentMonth={activeMonth}
                  currentYear={activeYear}
                  tasks={tasks}
                />
              </tr>
              <tr>
                <CalendarRow
                  firstDay={firstDayInMonth[activeMonth]}
                  lastDayInMonth={new Date(activeYear, activeMonth + 1, 0).getDate()}
                  row={2}
                  currentMonth={activeMonth}
                  currentYear={activeYear}
                  tasks={tasks}
                />
              </tr>
              <tr>
                <CalendarRow
                  firstDay={firstDayInMonth[activeMonth]}
                  lastDayInMonth={new Date(activeYear, activeMonth + 1, 0).getDate()}
                  row={3}
                  currentMonth={activeMonth}
                  currentYear={activeYear}
                  tasks={tasks}
                />
              </tr>
              <tr>
                <CalendarRow
                  firstDay={firstDayInMonth[activeMonth]}
                  lastDayInMonth={new Date(activeYear, activeMonth + 1, 0).getDate()}
                  row={4}
                  currentMonth={activeMonth}
                  currentYear={activeYear}
                  tasks={tasks}
                />
              </tr>
              <tr>
                <CalendarRow
                  firstDay={firstDayInMonth[activeMonth]}
                  lastDayInMonth={new Date(activeYear, activeMonth + 1, 0).getDate()}
                  row={5}
                  currentMonth={activeMonth}
                  currentYear={activeYear}
                  tasks={tasks}
                />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
