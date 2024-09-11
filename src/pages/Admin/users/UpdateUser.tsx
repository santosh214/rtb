import { Box, TextField, Card, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { boxShadow, elementSpacing, formWidth } from './../../../utils/constant';
import { api } from './api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import UIButton from '../../../components/UIElements/Button';
import { UserInterface } from './utils';
import { useEffect, useState } from 'react';

export default function UpdateUser() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<UserInterface>({
    defaultValues: {
      name: '',
      email: '',
      amount: '',
      password: '', // Initially set password as empty
    }
  });

  const [currentPassword, setCurrentPassword] = useState<string>('');

  useEffect(() => {
    if (id) {
      getUserById(id);
    }
  }, [id]);

  const _name = watch('name');
  const _email = watch('email');
  const _amount = watch('amount');
  const _password = watch('password');

  const getUserById = async (id: string) => {
    try {
      if (id) {
        const user = await api.getUsers({ id });
        console.log('User', user);
        if (user.length > 0) {
          const userData = user[0];
          console.log("🚀 ~ getUserById ~ userData:", userData)
          setValue('name', userData.name);
          setValue('email', userData.email);
          setValue('amount', userData.amount);
          setCurrentPassword(userData.password); // Preserve the current password
        }
      }
    } catch (error) {
      console.log('Error fetching user data', error);
    }
  };

  const onSubmit: SubmitHandler<UserInterface> = async (data) => {
    try {
      // Check if password is provided, if not use the current password
      const updateData = {
        ...data,
        password:  currentPassword
      };

      await api.updateUser(id, updateData);
      toast.success('User updated successfully');
      navigate('/dashboard/users');
    } catch (error) {
      console.log('Error updating user', error);
      toast.error('Error updating user');
    }
  };

  return (
    <Box justifyContent={'center'} display={'flex'}>
      <Box width={formWidth}>
        <Card sx={{ p: elementSpacing, ...boxShadow }}>
          <Typography variant="h4">Update User</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Name"
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: !!_name }}
            />
            <TextField
              label="Email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: !!_email }}
            />
            <TextField
              label="Amount"
              type="number"
              inputProps={{ min: 0 }}
              {...register('amount')}
              error={!!errors.amount}
              helperText={errors.amount ? errors.amount.message : ''}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: !!_amount }}
            />
            <TextField
              label="Password"
              type="password"
              value={currentPassword} // Make password optional
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: !!currentPassword }}
              disabled={true}
            />
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
