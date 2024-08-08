import React from 'react'
import { UITable } from '../../../components/UIElements/Table'
import { dummyData, sectionSpacing } from '../../../utils/constant'
import { Box, Button } from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

export default function Users() {
    const users = useSelector((state: RootState) => state.list.users);
    console.log("🚀 ~ Users ~ users:", users)

    return (
        <>
            <Box display={'flex'} justifyContent={'end'} mb={sectionSpacing}>
                <Button variant='contained'>Add User</Button>
            </Box>
            <UITable data={dummyData} />
        </>
    )
}
