import { Box, TextField, Button, Card, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  boxShadow,
  elementSpacing,
  formWidth,
} from './../../../utils/constant';
import { api } from './api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import UIButton from '../../../components/UIElements/Button';

type Inputs = {
  name: string;
  email: string;
  id: string;
  amount:number
};

export default function AddUser() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log('dddd', data);
    // localStorage.setItem('email', data.email)
    data.id = uuidv4();

    try {
      const addUser = await api.addUser(data);
      console.log('Add User', addUser);
      toast.success('User added successfully');
      navigate('/dashboard/users');
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <Box justifyContent={'center'} display={'flex'}>
      <Box width={formWidth}>
        <Card sx={{ p: elementSpacing, ...boxShadow }}>
          <Typography variant="h4">Add User</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Name"
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              fullWidth
              margin="normal"
            />
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
