import React, { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { FaCheck, FaSort } from "react-icons/fa";

export const Select: React.FC<React.HTMLAttributes<HTMLSelectElement>> = ({ className, children, ...other }) => {
  return (
    <select
      className={`${className} block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 `}
      {...other}
    >
      {children}
    </select>
  );
};

interface CustomSelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  options: any[];
  value: any;
  onChange: (value: any) => void;
  label: string;
  id: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, label, id }) => {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? options
      : options.filter((option: any) =>
          option[label].toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div>
      <Combobox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <div className="relative block w-full overflow-hidden rounded-lg border px-1 py-0.5 text-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(person: any) => person.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <FaSort className="text-gray-400" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filtered.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nothing found.</div>
              ) : (
                filtered.map((option) => (
                  <Combobox.Option
                    key={option[id]}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {option[label]}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <FaCheck />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
