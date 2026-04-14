import React from 'react'
import type { JSX } from 'react/jsx-runtime'



    
// Component

function TableHeaderCell({
  alignClass,
  label
}: {
  alignClass: string;
  label: string;
}) {
  return (
    <th
      scope={"col"}
      className={`border-b p-0 ${alignClass} text-sm`}
      style={{ width: "1px" }}
    >
      <div className={"w-full h-full border-b px-3 py-1.5"}>
        {label}
      </div>
    </th>
  );
}
    

export default TableHeaderCell
