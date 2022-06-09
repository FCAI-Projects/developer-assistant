import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { decodeToken } from "react-jwt";
import { useRecoilValue } from "recoil";
import { CalendarRow } from "../components/CalendarRow";
import { Loader } from "../components/Loader";
import { useTasksByUserIdQuery } from "../graphql/generated/graphql";
import { authState } from "../recoil";

export interface CalendarProps {}

export const Calendar: React.FC<CalendarProps> = () => {
  const authToken = useRecoilValue(authState);
  const [id, setId] = useState("");
  const [tasks, setTasks] = useState([]);
  const { data, loading } = useTasksByUserIdQuery({ variables: { userId: id } });
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [activeMonthString, setActiveMonthString] = useState(new Date().toDateString().split(" ")[1]);
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  const prevMonth = useRef<number>(null);
  const [firstDayInMonth, setFirstDayInMonth] = useState<number[]>([]);

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

  useEffect(() => {
    if (authToken) {
      const decode: any = decodeToken(authToken);
      setId(decode._id);
    }
  }, [authToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader />
      </div>
    );
  }

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
          <table className="h-full w-full table-fixed">
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
            {data?.tasksByUserId && (
              <tbody>
                <tr>
                  <CalendarRow
                    firstDay={firstDayInMonth[activeMonth]}
                    lastDayInMonth={new Date(activeYear, activeMonth + 1, 0).getDate()}
                    row={0}
                    currentMonth={activeMonth}
                    currentYear={activeYear}
                    tasks={data?.tasksByUserId}
                  />
                </tr>
                <tr>
                  <CalendarRow
                    firstDay={firstDayInMonth[activeMonth]}
                    lastDayInMonth={new Date(activeYear, activeMonth + 1, 0).getDate()}
                    row={1}
                    currentMonth={activeMonth}
                    currentYear={activeYear}
                    tasks={data?.tasksByUserId}
                  />
                </tr>
                <tr>
                  <CalendarRow
                    firstDay={firstDayInMonth[activeMonth]}
                    lastDayInMonth={new Date(activeYear, activeMonth + 1, 0).getDate()}
                    row={2}
                    currentMonth={activeMonth}
                    currentYear={activeYear}
                    tasks={data?.tasksByUserId}
                  />
                </tr>
                <tr>
                  <CalendarRow
                    firstDay={firstDayInMonth[activeMonth]}
                    lastDayInMonth={new Date(activeYear, activeMonth + 1, 0).getDate()}
                    row={3}
                    currentMonth={activeMonth}
                    currentYear={activeYear}
                    tasks={data?.tasksByUserId}
                  />
                </tr>
                <tr>
                  <CalendarRow
                    firstDay={firstDayInMonth[activeMonth]}
                    lastDayInMonth={new Date(activeYear, activeMonth + 1, 0).getDate()}
                    row={4}
                    currentMonth={activeMonth}
                    currentYear={activeYear}
                    tasks={data?.tasksByUserId}
                  />
                </tr>
                <tr>
                  <CalendarRow
                    firstDay={firstDayInMonth[activeMonth]}
                    lastDayInMonth={new Date(activeYear, activeMonth + 1, 0).getDate()}
                    row={5}
                    currentMonth={activeMonth}
                    currentYear={activeYear}
                    tasks={data?.tasksByUserId}
                  />
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};
