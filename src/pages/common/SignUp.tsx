import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Typography, Box, Card } from '@mui/material';
import { boxShadow, elementSpacing, formWidth } from '../../utils/constant';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { api } from '../Admin/users/api';
import { useNavigate } from 'react-router-dom';
import { getAdmin } from '../../utils/utlis';
import { UserInterface } from '../Admin/users/utils';

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInterface>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserInterface> = async (data) => {
    // onSignUp(data); // Pass data to parent component
    try {
      // localStorage.setItem('email', data.email)
      data.id = uuidv4();

      try {
        const addUser = await api.addUser(data);
        console.log('Add User', addUser);
        toast.success('Registration successfully done');
        if(getAdmin()){
          navigate('/dashboard');
        }
        else{
          navigate('/');
        }
      } catch (error) {
        console.log('Error', error);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <Box justifyContent={'center'} display={'flex'}>
        <Box width={formWidth}>
          <Card sx={{ p: elementSpacing, ...boxShadow }}>
            <Typography variant="h4" gutterBottom>
              Employee Sign Up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mb={2}>
                <TextField
                  label="Employee ID"
                  variant="outlined"
                  fullWidth
                  {...register('employeeId', {
                    required: 'Employee ID is required',
                  })}
                  error={!!errors.employeeId}
                  helperText={errors.employeeId?.message}
                />
              </Box>

              <Box mb={2}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  {...register('name', { required: 'Name is required' })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Box>

              <Box mb={2}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: 'Invalid email address',
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Box>

              <Box mb={2}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Sign Up
              </Button>
            </form>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
