"use client";

import React from "react";
import DropdownMenu from "../subcomponents/dropdown";
import { EditIcon } from "lucide-react";

interface TableProps {
  columns: { key: string; label: string; render?: (item: any) => void }[];
  data: Record<string, any>[];
  actions?: {
    label: string;
    onClick: (item: any) => void;
    condition?: (item: any) => boolean;
  }[];
}

export const Table: React.FC<TableProps> = ({ columns, data, actions }) => {
  return (
    <div className="space-y-6 p-6">
      {/* Table Card */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Table Header */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gradient-to-r from-[#ffa500] to-[#ff7f00] text-white">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 text-left text-base font-semibold uppercase tracking-wider"
                  >
                    {col.label}
                  </th>
                ))}
                {actions?.length ? (
                  <th className="px-4 py-3 text-left text-base font-semibold"></th>
                ) : null}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-[#f7f7f7]"
                  } hover:bg-[#ffd699] transition-all duration-300 cursor-pointer border-b-2`}
                >
                  {/* Table Data */}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-4 text-sm text-gray-700"
                    >
                      {col.render ? col.render(row) : row[col.key] || "N/A"}
                    </td>
                  ))}

                  {/* Action Button */}
                  {actions?.length ? (
                    <td className="px-4 py-4 text-sm text-gray-700">
                      <DropdownMenu
                        buttonText={
                          <div className="w-8 flex justify-center items-center">
                            <EditIcon className="w-5 h-5 text-[#ffa500]" />
                          </div>
                        }
                        items={actions
                          .filter((action) =>
                            action.condition ? action.condition(row) : true
                          )
                          .map((a) => ({
                            label: a.label,
                            onClick: a.onClick.bind(null, row),
                          }))}
                      />
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
