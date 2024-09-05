import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  const handleRow = (id: number) => {
    navigate(`/dashboard/${route}/${id}`);
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.id}>{col.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: DataRow) => (
            <TableRow
              key={row.id}
              hover
              onClick={() => handleRow(row.id)}
              sx={{ cursor: 'pointer' }}
            >
              {columns.map((col) => (
                <TableCell key={col.id}>{row[col.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { UITable };
export type { DataRow, Column };
