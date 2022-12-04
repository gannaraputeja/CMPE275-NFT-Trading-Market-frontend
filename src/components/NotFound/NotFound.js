/* eslint-disable react/jsx-filename-extension */
import { Grid, Typography } from '@mui/material';
import React from 'react';

function NotFound() {
  return (
    <Grid container justifyContent="center" alignContent="center">
      <Grid item>
        <Typography variant="h4">
          404 Page not found
        </Typography>
      </Grid>
    </Grid>
  );
}

export default NotFound;
