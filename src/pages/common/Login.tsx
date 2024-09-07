import { Box, TextField, Button, Card, Typography } from '@mui/material'
import { useForm, SubmitHandler } from "react-hook-form"
import { boxShadow, elementSpacing, formWidth } from '../../utils/constant'
import UIButton from '../../components/UIElements/Button'

type Inputs = {
    email: string
    password: string
}

export default function Login() {
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        localStorage.setItem('email', data.email)
    }

    return (
        <Box justifyContent={'center'} display={'flex'}>
            <Box width={formWidth}>
                <Card sx={{ p: elementSpacing, ...boxShadow }} >
                    <Typography variant='h4' >Login</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>


                        <TextField
                            label="Enter your email"
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            error={!!errors.email}
                            helperText={errors.email ? errors.email.message : ""}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Enter your password"
                            {...register("password", { required: "Password is required" })}
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : ""}
                            fullWidth
                            margin="normal"
                        />

                        <UIButton type="submit" variant="contained" color="primary" sx={{ mt: elementSpacing }}>
                            Submit
                        </UIButton>
                    </form>
                </Card>

            </Box>
        </Box>

    )
}
