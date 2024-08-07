import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface DataRow {
    id: number;
    name: string;
    age: number;
}

interface TableWithRowActionsProps {
    data: DataRow[];
}

const UITable: React.FC<TableWithRowActionsProps> = ({ data }) => {
    const handleEdit = (id: number): void => {
        console.log(`Edit item ${id}`);
        // Add your edit logic here
    };

    const handleDelete = (id: number): void => {
        console.log(`Delete item ${id}`);
        // Add your delete logic here
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: DataRow) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.age}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleEdit(row.id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(row.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export { UITable };
export type { DataRow };
