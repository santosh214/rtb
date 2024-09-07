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
  id: string;
  name: string;
  quantity: string;
  price: string;
};

export default function AddItem() {
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
      const AddItem = await api.addItem(data);
      console.log('Add User', AddItem);
      toast.success('Items added successfully');
      navigate('/dashboard/items');
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <Box justifyContent={'center'} display={'flex'}>
      <Box width={formWidth}>
        <Card sx={{ p: elementSpacing, ...boxShadow }}>
          <Typography variant="h4">Add Item</Typography>
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
              label="Quantity"
              type="text"
              {...register('quantity', { required: 'Quantity is required' })}
              error={!!errors.quantity}
              helperText={errors.quantity ? errors.quantity.message : ''}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              type="text"
              inputProps={{
                min: 0,
              }}
              {...register('price')}
              error={!!errors.price}
              helperText={errors.price? errors.price.message : ''}
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
