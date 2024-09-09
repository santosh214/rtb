import { Box, TextField, Card, Typography, Alert } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { boxShadow, elementSpacing, formWidth } from '../../utils/constant';
import UIButton from '../../components/UIElements/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../Admin/users/api';

type Inputs = {
  email: string;
  password: string;
  role: 'admin' | 'user';
};

export default function Login() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data:any) => {
    try {
      if (data.email) {
        const users = await api.getUsers();
        console.log('Users', users);
        const user = users.find(
          (u) => u.email === data.email && u.password === data.password,
        );
        console.log('user', user);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          user?.role === 'admin' ? navigate('/dashboard') : navigate('/');
        } else {
          setLoginError('Invalid Credentials');
        }
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <Box justifyContent={'center'} display={'flex'}>
      <Box width={formWidth}>
        <Card sx={{ p: elementSpacing, ...boxShadow }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>

          {/* Show login error if any */}
          {loginError && <Alert severity="error">{loginError}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <TextField
              label="Enter your email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              fullWidth
              margin="normal"
            />

            {/* Password Field */}
            <TextField
              label="Enter your password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              fullWidth
              margin="normal"
            />

            {/* Submit Button */}
            <UIButton
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: elementSpacing }}
            >
              Submit
            </UIButton>
          </form>
        </Card>
      </Box>
    </Box>
  );
}
