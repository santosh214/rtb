import { Box, TextField, Button, Card, Typography } from '@mui/material'
import { useForm, SubmitHandler } from "react-hook-form"
import { boxShadow, elementSpacing, formWidth } from './../../../utils/constant';
import { api } from './api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type Inputs = {
    name: string
    email: string
    id: string
}

export default function AddUser() {
    const navigate=useNavigate()
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        console.log("dddd",data)
        // localStorage.setItem('email', data.email)
        try {
            
            const addUser= await api.addUser(data)
            console.log('Add User', addUser)
            toast.success("User added successfully")
            navigate('/dashboard/users')
            
        } catch (error) {
            
            console.log('Error',error)
        }
    }

    return (
        <Box justifyContent={'center'} display={'flex'}>
            <Box width={formWidth}>
                <Card sx={{ p: elementSpacing, ...boxShadow }} >
                    <Typography variant='h4' >Add User</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="ID"
                            type="text"
                            {...register("id", { required: "ID is required" })}
                            error={!!errors.id}
                            helperText={errors.id ? errors.id.message : ""}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Name"
                            {...register("name", { required: "Name is required" })}
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message : ""}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            error={!!errors.email}
                            helperText={errors.email ? errors.email.message : ""}
                            fullWidth
                            margin="normal"
                        />

                        <Button type="submit" variant="contained" color="primary" sx={{ mt: elementSpacing }}>
                            Submit
                        </Button>
                    </form>
                </Card>

            </Box>
        </Box>

    )
}
