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
  email: string;
  id: string;
  amount: string;
};

export default function UpdateUser() {
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
 const _email= watch("email")
 const _amount= watch("amount")

  
  const getUserById=async(id:string)=>{
    try {
      if(id){

      const user = await api.getUsers({id:id});
      console.log('User', user);
      setValue('email',user[0].email)
      setValue('name',user[0].name)
      setValue('amount',user[0].amount)

      console.log("🚀 ~ getUserById ~ user[0].email:", user[0].email)
      console.log("🚀 ~ getUserById ~ user[0].amount:", user[0].amount)
    }
    } catch (error) {
      console.log('Error', error);
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log('dddd', data);
    // localStorage.setItem('email', data.email)

    try {
      const addUser = await api.updateUser(id, data);
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
              label="Email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink:!!_email
              }}
            />
            <TextField
              label="Amount"
              type="number"
              inputProps={{
                min: 0,
              }}
              {...register('amount')}
              error={!!errors.amount}
              helperText={errors.amount ? errors.amount.message : ''}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink:!!_amount
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
