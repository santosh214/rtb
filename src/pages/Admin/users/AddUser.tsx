import { Box, TextField, Button, Card, CardHeader, Typography } from '@mui/material'
import { useForm, SubmitHandler } from "react-hook-form"
import { elementSpacing, sectionSpacing } from './../../../utils/constant';

type Inputs = {
    name: string
    email: string
    id: string
}

export default function AddUser() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        <Box justifyContent={'center'} display={'flex'}>
            <Box width={700}>
                <Card sx={{ p: elementSpacing }}>
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

                        <Button type="submit" variant="contained" color="primary" sx={{mt:elementSpacing}}>
                            Submit
                        </Button>
                    </form>
                </Card>

            </Box>
        </Box>

    )
}
