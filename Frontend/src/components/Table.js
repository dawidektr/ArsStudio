import React, {  useMemo } from "react";
import { Link } from "react-router-dom";
import { useGlobalFilter, useSortBy, useTable,usePagination } from "react-table";
import { GlobalFilter } from "./globalFilter";


 const Table = ({data,handleDelete,role}) => {
  
  const productsData = useMemo(() => [...data], [data]);
  const productsColumns = useMemo(
    () => data[0] ? Object.keys(data[0]).map((key) => {return { Header: key, accessor: key };}) : [],
    [data]
  );


  const tableHooks = (hooks) => {
   
    if(role==="admin"){
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edycja",
        Cell: ({ row }) => (
         <Link to={`/edit/${row.values.id_tractor}`}> <button>
            Edycja
          </button>
          </Link>
        ),
      },
      {
        id: "Delete",
        Header: "Usuń",
        Cell: ({ row }) => (
          <button onClick={() => handleDelete(row.values.id_tractor)}>
            Usuń
          </button>
        ),
      },
    ]);
  }
  else if(role==="user"){
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
         <Link to={`/edit/${row.values.id_tractor}`}> <button>
            Edit
          </button>
          </Link>
        ),
      },
    ]);
  }
}


  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    tableHooks,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = tableInstance;


  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);

            return (
              <tr
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
     
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Strona{' '}
          <strong>
            {pageIndex + 1} z {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 25, 50, 100].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Pokaż {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Table;