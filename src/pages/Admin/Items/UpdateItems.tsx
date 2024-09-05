import { Box, TextField, Button, Card, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  boxShadow,
  elementSpacing,
  formWidth,
} from './../../../utils/constant';
import { api } from './api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

type Inputs = {
  name: string;
  quantity: number;
  price: number;
};

export default function UpdateItems() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    setValue,watch
  } = useForm<Inputs>();

  useEffect(() => {
    if(id){

      getUserById(id);
    }  
  
    return () => {
      
    }
  }, [id])
 const _name= watch("name")
 const _quantity= watch("quantity")
 const _price= watch("price")

  
  const getUserById=async(id:string)=>{
    try {
      if(id){

      const item = await api.getItems({id:id});
      console.log('User', item);
      setValue('name',item[0].name)
      setValue('quantity',item[0].quantity)
      setValue('price',item[0].price)

    }
    } catch (error) {
      console.log('Error', error);
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log('dddd', data);
    // localStorage.setItem('email', data.email)

    try {
      const addUser = await api.updateItem(id, data);
      console.log('Add User', addUser);
      toast.success('Item updatesuccessfully');
      navigate('/dashboard/items');
    } catch (error) {
      console.log('Error', error);
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
              InputLabelProps={{
                shrink:!!_name
              }}

            />
            <TextField
              label="Quantity"
              type="quantity"
              {...register('quantity', { required: 'Quantity is required' })}
              error={!!errors.quantity}
              helperText={errors.quantity ? errors.quantity.message : ''}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink:!!_quantity
              }}
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
              InputLabelProps={{
                shrink:!!_price
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: elementSpacing }}
            >
              Submit
            </Button>
          </form>
        </Card>
      </Box>
    </Box>
  );
}
