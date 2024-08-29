import { useCallback, useState, useEffect } from 'react';
import { UITable } from '../../../components/UIElements/Table';
import { dummyData, sectionSpacing } from '../../../utils/constant';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { NavLink } from 'react-router-dom';
import { userColumns } from './utils';
import { toast } from 'react-toastify';
import { apiClient } from '../../../utils/api-client';
import { api } from './api';

export default function Users() {
    const users = useSelector((state: RootState) => state.list.users);
    // console.log("🚀 ~ Users ~ users:", users);
    const [filterUser, setFilterUser] = useState('');


    useEffect(() => {
        getAllUsers()

        return () => {

        }
    }, [])

    const handleUserFilter = (query: string) => {
        setFilterUser(query);
    };

    const filteredData = useCallback(() => {
        return dummyData.filter(user => user.name.toLowerCase().includes(filterUser.toLowerCase()));
    }, [filterUser]);

    const getAllUsers = async () => {
        try {
           const users= await api.getUsersImage()
           console.log("🚀 ~ getAllUsers ~ users:", users)
        } catch (error) {
            console.log("🚀 ~ getAllUsers ~ error:", error)
            toast.error("Failed to fetch Users list")

        }
    }

    return (
        <>

            <Box display={'flex'} justifyContent={'end'} mb={sectionSpacing}>
                <NavLink to={'/dashboard/users/add'}>

                    <Button variant='contained' >Add User</Button>
                </NavLink>
            </Box>
            <Grid container spacing={sectionSpacing}>
                <Grid item xs={12} sm={12} md={4} >

                    <TextField label='Search user' fullWidth value={filterUser} onChange={(e) => handleUserFilter(e.target.value)} />
                </Grid>
                <Grid item xs={12}>

                    <UITable
                        data={filteredData()}
                        columns={userColumns}
                        onEdit={(id) => console.log(`Edit item ${id}`)}
                        onDelete={(id) => console.log(`Delete item ${id}`)}
                    />
                </Grid>
            </Grid>


        </>
    );
}
