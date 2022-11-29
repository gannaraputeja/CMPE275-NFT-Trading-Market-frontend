/* eslint-disable react/jsx-filename-extension */
import {
  Box,
  Button, Grid, InputLabel, TextField,
} from '@mui/material';
import React from 'react';

function EmailVerification() {
  return (
    <Grid container display="grid" justifyContent="center" alignContent="center" height="500px" borderColor="Background">
      <Box sx={{ border: 0, borderColor: 'primary.main', padding: '100px' }}>
        <Grid item>
          <InputLabel style={{ marginBottom: '20px' }}><strong>Enter Code to Verify Email</strong></InputLabel>
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
      </Box>
    </Grid>
  );
}

export default EmailVerification;
