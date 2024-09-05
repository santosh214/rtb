import { useCallback, useState, useEffect } from 'react';
import { UITable } from '../../../components/UIElements/Table';
import { sectionSpacing } from '../../../utils/constant';
import { Box, Button, Grid, TextField } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { userColumns } from './utils';
import { toast } from 'react-toastify';
import { api } from './api';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Users() {
  const [filterUser, setFilterUser] = useState('');
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleUserFilter = (query: string) => {
    setFilterUser(query);
  };

  const filteredData = useCallback(() => {
    return users?.filter(user =>
      user.name.toLowerCase().includes(filterUser.toLowerCase())
    );
  }, [filterUser, users]);
  console.log("fff",filteredData())

  const getAllUsers = async () => {
    try {
      const _users = await api.getUsers();
      console.log("🚀 ~ getAllUsers ~ users:", _users);
      setUsers(_users); // Set the user data correctly
    } catch (error) {
      console.error("🚀 ~ getAllUsers ~ error:", error);
      toast.error("Failed to fetch Users list");
    }
  };

  return (
    <>
      <Box display={'flex'} justifyContent={'end'} mb={sectionSpacing}>
        <NavLink to={'/dashboard/users/add'}>
          <Button variant='contained'>Add User</Button>
        </NavLink>
      </Box>
      <Grid container spacing={sectionSpacing}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label='Search user'
            fullWidth
            value={filterUser}
            onChange={(e) => handleUserFilter(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <UITable
            data={filteredData() || []} // Ensure data is not undefined
            columns={userColumns}
            onEdit={(id) => console.log(`Edit item ${id}`)}
            onDelete={(id) => console.log(`Delete item ${id}`)}
            route='user'
          />
        </Grid>
      </Grid>
    </>
  );
}
