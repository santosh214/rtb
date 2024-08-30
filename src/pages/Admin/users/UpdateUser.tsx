import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from './api';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    name: string;
    email: string;
    id: string;
    amount:number
  };
const UpdateUser = () => {
  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();
  console.log('🚀 ~ UpdateUser ~ id:', id);
  const navigate = useNavigate();

  // Find user by ID from dummy data

  // Set initial form values
  const [formData, setFormData] = useState({
    name: '', // user?.name ||
    email: '', // user?.email ||
    amount: '', // user?.amount ||
  });
  useEffect(() => {
    getUserById();
    return () => {};
  }, [id]);

  const getUserById = async () => {
    try {
      if (id) {
        const _user = await api.getUsers({ id: id });
        console.log('🚀 ~ getAllUsers ~ users:', _user);
        // setFormData({
        //   name: user.name,
        //   age: user.age,
        //   email: user.email,
        //   amount: user.amount,
        // });
      }
    } catch (error) {
      console.error('🚀 ~ getAllUsers ~ error:', error);
      toast.error('Failed to fetch Users list');
    }
  };

 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log('dddd', data);
    // localStorage.setItem('email', data.email)

    try {
      const addUser = await api.updateUser(data,);
      console.log('Add User', addUser);
      toast.success('User added successfully');
      navigate('/dashboard/users');
    } catch (error) {
      console.log('Error', error);
    }
  };
  

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Update User
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <TextField
              label="Name"
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
              fullWidth
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
          <TextField
              label="Email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
              label="Amount"
              type="number"
              inputProps={{
                min:0,
                
              }}
              {...register('amount')}
              error={!!errors.amount}
              helperText={errors.amount ? errors.amount.message : ''}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
        >
          Update User
        </Button>
      </form>
    </Container>
  );
};

export default UpdateUser;
