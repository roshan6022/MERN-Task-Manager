import React from "react";

// All statuses you want to show even if empty
const defaultLegend = [
  { value: "Pending", color: "#BD51FF" },
  { value: "In Progress", color: "#00B8DB" },
  { value: "Completed", color: "#7BCE00" },
];

const CustomLegend = ({ payload }) => {
  // If payload is missing or empty, use default
  const isEmpty = !payload || payload.length === 0;

  const legendData = isEmpty
    ? defaultLegend
    : defaultLegend.map((item) => {
        const match = payload.find((p) => p.value === item.value);
        return {
          ...item,
          color: match?.color || item.color,
        };
      });

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
      {legendData.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-xs text-gray-700 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
