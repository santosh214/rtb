import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';


const UpdateUser = () => {
    const { id } = useParams<{ id: string }>();
    console.log("🚀 ~ UpdateUser ~ id:", id)
    const navigate = useNavigate();
    
    // Find user by ID from dummy data

    // Set initial form values
    const [formData, setFormData] = useState({
        name: '',  // user?.name ||  
        age: '',  // user?.age || 
        email: '',  // user?.email || 
        amount: ''  // user?.amount || 
    });

    // useEffect(() => {
    //     if (user) {
    //         setFormData({
    //             name: user.name,
    //             age: user.age,
    //             email: user.email,
    //             amount: user.amount
    //         });
    //     }
    // }, [user]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission (e.g., update user data)
        console.log('Updated User Data:', formData);
        navigate('/dashboard/users'); // Navigate to home or another page after update
    };


    return (
        <Container>
            <Typography variant="h4" gutterBottom>Update User</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Age"
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Amount"
                            name="amount"
                            type="number"
                            value={formData.amount}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                    Update User
                </Button>
            </form>
        </Container>
    );
};

export default UpdateUser;
