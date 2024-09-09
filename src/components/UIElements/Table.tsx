import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination, // Pagination component
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

interface DataRow {
  [key: string]: any; // Allow any key-value pair
}

interface Column {
  id: string;
  label: string;
  isActionColumn?: boolean;
}

interface TableWithRowActionsProps {
  data: DataRow[];
  columns: Column[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  route: string;
}

const UITable: React.FC<TableWithRowActionsProps> = ({
  data,
  columns,
  onEdit,
  onDelete,
  route,
}) => {
  const navigate = useNavigate();
  
  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page whenever rows per page changes
  };

  // Slice the data to show only the relevant rows for the current page
  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleRow = (id: number) => {
    navigate(`/dashboard/${route}/${id}`);
  };

  return (
    <>
      <TableContainer>
        <Table >
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            {paginatedData.map((row: DataRow, index: number) => (
              <TableRow
                key={row.id}
                hover
                onClick={() => handleRow(row.id)}
                sx={{ cursor: 'pointer' }}
              >
                {columns.map((col) => (
                  <TableCell key={col.id} >
                    {col.id === 'id' ? index + 1 + page * rowsPerPage : row[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Component */}
      <TablePagination
        component="div"
        count={data.length} // Total number of rows
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]} // Rows per page options
      />
    </>
  );
};

export { UITable };
export type { DataRow, Column };
