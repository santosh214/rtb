import { Box, TextField } from '@mui/material'
import React from 'react'

export default function AddUser() {
    
    const AddUser=()=>{
        console.log('h')
    }
    return (
        <Box>
            <form>
                <TextField label="name" type='text' />
                <TextField label="age" type='number' />
                <TextField label="email" type='email' />
            </form>
        </Box>
    )
}
