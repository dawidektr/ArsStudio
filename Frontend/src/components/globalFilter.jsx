import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";




export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  return (
    <div className="search">
      <h2>Wyszukaj:</h2>
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Liczba rekordów: ${count} `}
      />
    </div>
  );
}