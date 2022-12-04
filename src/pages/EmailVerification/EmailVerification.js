/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import {
  Alert,
  Box,
  Button, Grid, InputLabel, TextField, Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmailVerification() {
  const navigate = useNavigate();
  return (
    <Grid container display="grid" justifyContent="center" alignContent="center" height="500px" borderColor="Background">
      {/* <Box sx={{ border: 0, borderColor: 'primary.main', padding: '100px' }}>
        <Grid item>
          <InputLabel style={{ marginBottom: '20px' }}>
          <strong>Enter Code to Verify Email</strong></InputLabel>
          <TextField
            style={{ marginBottom: '20px' }}
            type="number"
            variant="outlined"
            size="small"
            required
          />
        </Grid>
        <Grid item display="flex" justifyContent="space-between">
          <Button variant="contained" color="error">Cancel</Button>
          <Button variant="contained" color="success">Submit</Button>
        </Grid>
      </Box> */}
      <Alert
        severity="success"
        sx={{
          width: 700, height: 60, fontSize: 30, alignItems: 'center', justifyContent: 'center', marginBottom: '50px',
        }}
      >
        Account Activation link sent to your email.
      </Alert>
      <Grid display="flex" justifyContent="center">
        {/* <Grid item display="flex" sx={{ marginBottom: '5px' }}>
          <Typography variant="p" component="p" sx={{ p: 2, fontFamily: 'sans-serif' }}>
          Did not receive email?</Typography>
        </Grid> */}
        <Grid item display="flex">
          <Button
            variant="outlined"
            size="medium"
            disableElevation
            onClick={() => navigate('/')}
          >
            Go Back to Login

          </Button>
        </Grid>
      </Grid>

    </Grid>
  );
}

export default EmailVerification;
