import React, { useState } from "react";
import TableThree from "../Tables/TableThree";
import { Link, useLocation } from "react-router-dom";

const Tabs = () => {
  const { pathname } = useLocation();
  let tabelsName = ["social", "comments", "likes", "followers"];
  return (
    <>
      <div className="mb-4 border-gray-200 ">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          {tabelsName.map((table, index) => (
            <li className="me-2" role="presentation" key={index}>
              <Link to={`/dashboard/tables/${table}`}>
                <button
                  className={
                    pathname == `/dashboard/tables/${table}`
                      ? "inline-block p-4 border-b-2 rounded-t-lg"
                      : "inline-block p-4 rounded-t-lg"
                  }
                  type="button"
                >
                  {`${table} Table`}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div id="default-tab-content">
        <div
          className={
            pathname == "/dashboard/tables/social"
              ? "p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              : "hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          }
        >
          <TableThree />
        </div>
      </div>
    </>
  );
};

export default Tabs;
