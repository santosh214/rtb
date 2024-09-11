// src/components/Profile.tsx
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
  Icon,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getUserData } from '../../utils/utlis'; // Ensure this function is correctly implemented
import { api } from '../Admin/users/api'; // Ensure this API is correctly implemented
import { UserInterface } from '../Admin/users/utils';

const Profile: React.FC = () => {
  const [formData, setFormData] = useState<UserInterface>({
    id: '',
    name: '',
    email: '',
    role: '', // This is in your User type but not used in the UI
    password: '',
    amount: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getUserData().id;
      if (userId) {
        try {
          const user = await api.getUsers({ id: userId });
          console.log('User', user[0]);
          setFormData({
            id: user[0].id,
            amount: user[0].amount,
            name: user[0].name,
            email: user[0].email,
            role: user[0].role, // If you want to use it, otherwise remove it
            password: user[0].password, // Ensure you handle sensitive data correctly
          });
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Employee ID"
              name="employeeId"
              value={formData.id}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }} // Make read-only if needed
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              InputProps={{ readOnly: true }} // Make read-only if needed

              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              fullWidth
              InputProps={{ readOnly: true }} // Make read-only if needed

              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              name="amount"
              value={formData.amount}
              InputProps={{ readOnly: true }} // Make read-only if needed
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true, // Make read-only if needed
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Profile;
