import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Card,
  CardBody,
  TableContainer,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useTable, useSortBy } from "react-table";
import "./table.scss";
import ReactPaginate from "react-paginate";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const CustomTable = ({
  columns,
  data,
  loading,
  count,
  handlePageChange,
  name,
}: any) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const SortIndicator: React.FC<{
    isSorted: boolean;
    isSortedDesc: boolean;
  }> = ({ isSorted, isSortedDesc }) =>
    isSorted ? (
      isSortedDesc ? (
        <FiChevronUp />
      ) : (
        <FiChevronDown />
      )
    ) : (
      <FiChevronUp />
    );

  return (
    <>
      <Card>
        <CardBody>
          <TableContainer overflowY="auto" maxHeight="600px">
            <Table {...getTableProps()} variant="simple">
              <Thead bg="blue.500">
                {headerGroups.map((headerGroup) => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column: any) => (
                      <Th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        color="white"
                  
                      >
                        {column.render("Header")}
                        <SortIndicator
                          isSorted={column.isSorted}
                          isSortedDesc={column.isSortedDesc}
                        />
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              {loading ? (
                <Center
                  className="loaderWrapper"
                  left={`${name === "category" ? "33%" : "45%"}`}
                >
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="#3182ce"
                    size="xl"
                  />
                </Center>
              ) : data?.length > 0 ? (
                <Tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <Tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <Td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </Td>
                        ))}
                      </Tr>
                    );
                  })}
                </Tbody>
              ) : (
                <Center
                  className="loaderWrapper"
                  left={`${name === "category" ? "33%" : "45%"}`}
                >
                  No Data Found
                </Center>
              )}
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
      {((data?.length > 0 && count) || !loading) && (
        <div className="paginateWrapper">
          <ReactPaginate
            className={"reactPaginateCustom"}
            pageCount={count}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      )}
    </>
  );
};

export default CustomTable;
