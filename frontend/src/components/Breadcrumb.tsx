import React from "react";

interface ItemsListInterface {
  name: string;
  link: string;
  icon?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  list: ItemsListInterface[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ list, className }) => {
  const lastElement: ItemsListInterface | null = list.length > 1 ? list[list.length - 1] : null;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className={`inline-flex items-center space-x-1 md:space-x-3 ${className}`}>
        <li className="inline-flex items-center">
          <a
            href={list[0].link}
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <HomeIcon />
            {/* {list[0].name} */}
          </a>
        </li>
        {list
          .slice(1)
          .splice(-1)
          .map((item, index) => (
            <li key={index}>
              <div className="flex items-center">
                <Icon />
                <a href={item.link} className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2">
                  {item.name}
                </a>
              </div>
            </li>
          ))}

        {lastElement && (
          <li aria-current="page">
            <div className="flex items-center">
              <Icon />
              <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2">{lastElement.name}</span>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};

const Icon: React.FC = () => {
  return (
    <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const HomeIcon: React.FC = () => {
  return (
    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
    </svg>
  );
};
