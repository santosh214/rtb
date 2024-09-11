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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAdmin, getUserData } from '../../utils/utlis';
import { v4 as uuidv4 } from 'uuid';
import { TransactionList } from '../../pages/Admin/Transaction/utils';
import { api } from '../../pages/Admin/Transaction/api';
import { toast } from 'react-toastify';

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

  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DataRow | null>(null);

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page whenever rows per page changes
  };

  // Slice the data to show only the relevant rows for the current page
  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const handleRowClick = (row: DataRow) => {
    if (getAdmin()) {
      navigate(`/dashboard/${route}/${row.id}`);
    } else {
      setSelectedItem(row);
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };


  const handlePurchase = async () => {
    // Ensure selectedItem has the required fields
    if (!selectedItem) {
      toast.error('No item selected');
      return;
    }
  
    const transactionData: TransactionList = {
      id: selectedItem.id, // Assuming `selectedItem.id` exists
      user_id: getUserData().id, // Replace with your method to get the user ID
      price: selectedItem.price,
      date: new Date(), // Current date
      item_name: selectedItem.name,
    };
  
    console.log('Purchasing item:', selectedItem);
    console.log('Transaction Data:', transactionData);
  
    try {
      // Pass transactionData to the API
      const addItem = await api.addTransaction(transactionData);
      console.log('Add Item:', addItem);
      toast.success('Item purchased successfully');
      // navigate('/'); // Navigate to the desired page
      handleDialogClose()
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to complete purchase');
    }
  
    handleDialogClose(); // Close the dialog after purchase
  };

  return (
    <>
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
            {paginatedData.map((row: DataRow, index: number) => (
              <TableRow
                key={row.id}
                hover={!getAdmin()}
                onClick={() => handleRowClick(row)}
                sx={{ cursor: 'pointer' }}
              >
                {columns.map((col) => (
                  <TableCell key={col.id}>
                    {col.id === 'id'
                      ? index + 1 + page * rowsPerPage
                      : row[col.id]}
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

      {/* Dialog for non-admin users */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6">Confirm Purchase</Typography>
        </DialogTitle>
        <DialogContent sx={{ maxHeight: '400px', overflowY: 'auto' }}>
          {selectedItem && (
            <>
              <Typography variant="h6" gutterBottom>
                {selectedItem.name}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">Quantity: {1}</Typography>
              <Typography variant="body1">
                Price: {selectedItem.price}
              </Typography>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handlePurchase} color="primary" variant="contained">
            Purchase
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { UITable };
export type { DataRow, Column };
