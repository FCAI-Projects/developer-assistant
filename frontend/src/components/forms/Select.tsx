import React, { Fragment, useEffect, useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { FaCheck, FaSort } from "react-icons/fa";
import useOutsideClick from "../../hooks/useOutsideClick";

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
                        active ? "bg-blue-600 text-white" : "text-gray-900"
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
                              active ? "text-white" : "text-blue-600"
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

interface MultiSelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  options: any[];
  value: any;
  onChange: (value: any) => void;
  label: string;
  id: string;
}

export const Multiselect: React.FC<MultiSelectProps> = ({ options, value, onChange, label, id }) => {
  // state showing if dropdown is open or closed
  const [dropdown, setDropdown] = useState(false);
  // managing dropdown items (list of dropdown items)
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  // contains selected items
  const [selectedItems, setSelected] = useState<Array<any>>(value);

  const toogleDropdown = () => {
    setDropdown(!dropdown);
  };
  // adds new item to multiselect
  const addTag = (item: any) => {
    setSelected(selectedItems.concat(item));
    setDropdown(false);
  };
  // removes item from multiselect
  const removeTag = (item: any) => {
    const filtered = selectedItems.filter((e: any) => e[id] !== item[id]);
    setSelected(filtered);
  };

  useEffect(() => {
    setFilteredItems(options.filter((option: any) => !selectedItems.find((el: any) => el[id] === option[id])));
    onChange(selectedItems);
  }, [selectedItems]);

  return (
    <div className="autcomplete-wrapper">
      <div className="autcomplete">
        <div className="mx-auto flex w-full flex-col items-center">
          <div className="w-full">
            <div className="relative flex flex-col items-center">
              <div className="w-full ">
                <div className="my-2 flex rounded-lg border border-gray-200 bg-white p-1 ">
                  <div className="flex flex-auto flex-wrap">
                    {selectedItems.map((tag: any, index) => {
                      return (
                        <div
                          key={index}
                          className="m-1 flex items-center justify-center rounded-full border border-blue-300 bg-blue-100 py-1 px-2 font-medium text-blue-700 "
                        >
                          <div className="max-w-full flex-initial text-xs font-normal leading-none">{tag[label]}</div>
                          <div className="flex flex-auto flex-row-reverse">
                            <div onClick={() => removeTag(tag)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                height="100%"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-x ml-2 h-4 w-4 cursor-pointer rounded-full hover:text-blue-400"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex-1">
                      <input
                        placeholder=""
                        className="h-full w-full appearance-none bg-transparent p-1 px-2 text-gray-800 outline-none"
                      />
                    </div>
                  </div>
                  <div
                    className="flex w-8 items-center border-l border-gray-200 py-1 pl-2 pr-1 text-gray-300"
                    onClick={toogleDropdown}
                  >
                    <button
                      type="button"
                      className="h-6 w-6 cursor-pointer text-gray-600 outline-none focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-up h-4 w-4"
                      >
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {dropdown ? (
              <Dropdown
                list={filteredItems}
                id={id}
                label={label}
                addItem={addTag}
                toogleDropdown={toogleDropdown}
              ></Dropdown>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

interface DropdownProps {
  list: Array<any>;
  addItem: (item: string) => void;
  toogleDropdown: () => void;
  id: string;
  label: string;
}

const Dropdown: React.FC<DropdownProps> = ({ list, addItem, toogleDropdown, label, id }) => {
  const ref = useRef<any>();

  useOutsideClick(ref, toogleDropdown);

  return (
    <div
      ref={ref}
      id="dropdown"
      className="top-100 lef-0 max-h-select absolute z-40 w-full overflow-y-auto rounded bg-white shadow "
    >
      <div className="flex w-full flex-col">
        {list.length === 0 && (
          <div className="flex flex-col items-center justify-center p-2">
            <div className="text-center text-gray-600">No Items</div>
          </div>
        )}
        {list.map((item: any, key) => {
          return (
            <div
              key={key}
              className="w-full cursor-pointer rounded-t border-b border-gray-100 hover:bg-blue-600 hover:text-white"
              onClick={() => addItem(item)}
            >
              <div className="relative flex w-full items-center border-l-2 border-transparent p-2 pl-2 hover:border-blue-100">
                <div className="flex w-full items-center">
                  <div className="mx-2 leading-6">{item[label]}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
