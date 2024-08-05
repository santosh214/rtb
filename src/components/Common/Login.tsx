import { Box, Button, Card, CardActionArea, CardContent, CardHeader, FormControl, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

export default function Login() {
    return (
        <Box display={'flex'} justifyContent={'center'} paddingTop={10}>
            <Box width={500}>


                <Card sx={{ p: 2 }}>

                    <Typography variant='h6' textAlign={'center'} textTransform={'uppercase'} >LOGIN</Typography>
                    <CardContent>
                        <FormControl fullWidth>
                            <TextField label='Email' type='email' fullWidth />
                        </FormControl>

                    </CardContent>
                    <CardContent>

                        <FormControl fullWidth>
                            <TextField label='Password' type='password' fullWidth />
                        </FormControl>
                    </CardContent>
                    <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant='contained' fullWidth size='large'>Login</Button>
                    </CardContent>

                </Card>

            </Box>

        </Box>
    )
}
