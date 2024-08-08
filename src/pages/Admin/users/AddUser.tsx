import { Box, TextField } from '@mui/material'
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    example: string
    exampleRequired: string
}
export default function AddUser() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    console.log(watch("example")) // watch input valu
    const AddUser = () => {
        console.log('h')
    }
    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input defaultValue="test" {...register("example")} />

                {/* include validation with required or other standard HTML validation rules */}
                <input {...register("exampleRequired", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" />
            </form>
        </Box>
    )
}
