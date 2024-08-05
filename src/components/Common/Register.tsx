// src/RegistrationForm.js
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Card, Box, CardContent, FormControl } from '@mui/material';


interface FormData {
    name: string;
    email: string;
    password: string;
}

export default function Register() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
    });

    // Handle input change with type definitions
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission with type definitions
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic
        console.log('Form data submitted:', formData);
    };

    return (
        <Box display={'flex'} justifyContent={'center'} paddingTop={10}>
            <Box width={500}>


                <Card sx={{ p: 2 }}>

                    <Typography variant='h6' textAlign={'center'} textTransform={'uppercase'} >Register</Typography>
                    <CardContent>
                        <FormControl fullWidth>
                            <TextField label='Name' type='text' fullWidth />
                        </FormControl>

                    </CardContent>
                    <CardContent>
                        <FormControl fullWidth>
                            <TextField label='Email' type='email' fullWidth />
                        </FormControl>

                    </CardContent>
                    <CardContent>

                        <FormControl fullWidth>
                            <TextField label='Password' type='password' fullWidth />
                        </FormControl>
                    </CardContent>
                    <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant='contained' fullWidth size='large'>Submit</Button>
                    </CardContent>

                </Card>

            </Box>

        </Box>
    );
};

