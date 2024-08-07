import React from 'react';
import { Typography } from '@mui/material';

const Home: React.FC = () => {
  return (
    <div>
      <Typography variant="h4">Welcome to the Home Page</Typography>
      <Typography paragraph>
        This is where your main content for the home page would go.
      </Typography>
    </div>
  );
};

export default Home;